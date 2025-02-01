require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const http = require("http");
const Movie = require("./models/Movie");

// Токен основного бота
const bot = new Telegraf(process.env.BOT_TOKEN);

// Загружаем фильмы из базы данных
// let movies = {};
// try {
//     movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
// } catch (error) {
//     console.error('Ошибка загрузки базы фильмов:', error);
// }

// Команда старт
// bot.command("start", (ctx) => {
//     ctx.reply(
//         "Привет! Ты уже подписан на все необходимые каналы. Можешь отправить мне КОД фильма."
//     );
// });

// Поиск фильма по коду

// bot.on("text", async (ctx) => {
//     const code = ctx.message.text.trim(); // Получаем введенный пользователем код

//     const movie = await Movie.findOne({ code });

//     if (movie) {
//         ctx.reply(
//             `🎬 *Название*: ${movie.title}\n📅 *Год*: ${movie.year}\n🎭 *Жанр*: ${movie.genre}`,
//             { parse_mode: "Markdown" }
//         );
//     } else {
//         ctx.reply("❌ Фильм с таким кодом не найден.");
//     }
// });

// bot.on('text', (ctx) => {
//     const userInput = ctx.message.text.trim();

//     // Check if the input is a numeric code
//     if (/^\d+$/.test(userInput)) {
//         const code = userInput;
//         if (movies[code]) {
//             ctx.reply(`Фильм по коду ${userInput}: ${movies[code]}`);
//         } else {
//             ctx.reply('Извините, но такого кода не существует.');
//         }
//     } else {
//         ctx.reply('Пожалуйста, введите правильный цифровой код фильма.');
//     }
// });

// bot.command('search', (ctx) => {
//     const code = ctx.message.text.split(' ')[1]; // Ожидаем, что пользователь введет команду в виде /search <код>
//     if (movies[code]) {
//         ctx.reply(`Найден фильм: ${movies[code]}`);
//     } else {
//         ctx.reply('Фильм с таким кодом не найден.');
//     }
// });

// Проверка подписки (фиктивная логика)
const requiredChannels = ["@best_films077"]; // Замените на ваши каналы

async function checkSubscription(ctx, userId) {
    for (let channel of requiredChannels) {
        try {
            const chatMember = await ctx.telegram.getChatMember(
                channel,
                userId
            );
            if (
                chatMember.status !== "member" &&
                chatMember.status !== "administrator" &&
                chatMember.status !== "creator"
            ) {
                return false; // Пользователь не подписан
            }
        } catch (error) {
            console.error(
                `Ошибка проверки подписки на канал ${channel}:`,
                error.message
            );
            return false; // Если канал не найден или другая ошибка
        }
    }
    return true; // Пользователь подписан
}


bot.start(async (ctx) => {
        const userId = ctx.from.id;
        const isSubscribed = await checkSubscription(ctx, userId);
    
        if (isSubscribed) {
            ctx.reply(
                "Привет! Ты уже подписан на все необходимые каналы. Можешь отправить мне КОД фильма."
            );
        } else {
            const channelsList = requiredChannels
                .map((channel) =>
                    channel.startsWith("@")
                        ? `➡️ [${channel}](https://t.me/${channel.slice(1)})`
                        : `➡️ [Канал](https://t.me/c/${channel.slice(4)})`
                )
                .join("\n");
            ctx.replyWithMarkdown(
                `Привет! Пожалуйста, подпишись на следующие каналы, чтобы пользоваться ботом:\n\n${channelsList}\n\nПосле подписки нажми /start снова.`
            );
        }
    });


// Обработка текстовых сообщений
bot.on("text", async (ctx) => {
    const userId = ctx.from.id;
    const isSubscribed = await checkSubscription(ctx, userId);

    if (!isSubscribed) {
        ctx.reply("Сначала подпишись на каналы и нажми /start.");
        return;
    }

        const code = ctx.message.text.trim(); // Получаем код от пользователя
        const movie = await Movie.findOne({ code });

    if (movie) {
        ctx.reply(
            `🎬 *Название*: ${movie.title}\n📅 *Год*: ${movie.year}\n🎭 *Жанр*: ${movie.genre}`,
            { parse_mode: "Markdown" }
        );
    } else {
        ctx.reply("❌ Фильм с таким кодом не найден.");
    }
});

// Фиктивный сервер для Render
const PORT = process.env.PORT || 3000; // Render передаёт порт через переменную окружения
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Бот работает!"); // Выводим простое сообщение
}).listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

        // const movie = movie[userCode]; // Ищем фильм в базе данных

        // if (movie) {
        //     ctx.replyWithMarkdownV2(`Фильм по коду ${userCode}:\n${movie}`); // Если фильм найден
        // } else {
        //     ctx.reply("Извините, но такого кода не существует."); // Если фильм не найден
        // }

    // });

// bot.command('check_subscription', (ctx) => {
//     const userId = ctx.from.id;
//     const hasSubscribed = true; // Здесь логика проверки подписки, например, через API Telegram
//     if (hasSubscribed) {
//         ctx.reply('Вы подписаны на наш канал!');
//     } else {
//         ctx.reply('Вы не подписаны на канал. Пожалуйста, подпишитесь!');
//     }
// });

// Запуск основного бота
bot.launch();
