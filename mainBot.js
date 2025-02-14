require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const http = require("http");
const Movie = require("./models/Movie");

// Токен основного бота
const bot = new Telegraf(process.env.BOT_TOKEN);





// Проверка подписки (фиктивная логика)
const requiredChannels = ["@kino_905"]; // Замените на ваши каналы

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
const PORT = process.env.PORT || 3001; // Render передаёт порт через переменную окружения
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Бот работает!"); // Выводим простое сообщение
}).listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});



const ADMIN_ID = 6764836918;
const admin_bot = new Telegraf("7441122720:AAHQMtph0L6zRqeRCJBp9vulcRtvjV6cDr8"); // Замени на свой токен

const userStates = {};

admin_bot.command("add_movie", (ctx) => {
    if (ctx.from.id !== ADMIN_ID) {
        return ctx.reply("У вас нет доступа к админ-панели!");
    }

    // Инициализация состояния пользователя
    userStates[ctx.from.id] = { step: "waiting_for_code" };
    ctx.reply("Введите код нового фильма:");
});

// Обработчик текстовых сообщений
admin_bot.on("text", async (ctx) => {
    const userId = ctx.from.id;
    const userText = ctx.message.text.trim();

    // Проверяем, есть ли пользователь в состоянии добавления фильма
    if (!userStates[userId]) {
        return ctx.reply(
            "Вы не находитесь в процессе добавления фильма. Введите /add_movie."
        );
    }

    const userState = userStates[userId];

    if (userState.step === "waiting_for_code") {
        if (Movie[userText]) {
            return ctx.reply(
                "❌ Такой код уже существует! Введите другой код:"
            );
        }
        userStates[userId] = {
            step: "waiting_for_title",
            newMovie: { code: userText },
        };
        return ctx.reply("Введите название фильма:");
    }

    if (userState.step === "waiting_for_title") {
        userState.newMovie.title = userText;
        userState.step = "waiting_for_year";
        return ctx.reply("Введите год выпуска:");
    }

    if (userState.step === "waiting_for_year") {
        if (!/^\d{4}$/.test(userText)) {
            return ctx.reply(
                "❌ Пожалуйста, введите корректный год (4 цифры):"
            );
        }
        userState.newMovie.year = userText;
        userState.step = "waiting_for_genre";
        return ctx.reply("Введите жанр фильма:");
    }

    if (userState.step === "waiting_for_genre") {
        userState.newMovie.genre = userText;

        // Сохраняем новый фильм
        const { code, title, year, genre } = userState.newMovie;
        Movie[code] = `${title} (${year}), Жанр: ${genre}`;
        const movie = new Movie({ code, title, year, genre });
        await movie.save();
        // saveMovies();

        // Удаляем пользователя из памяти
        delete userStates[userId];

        return ctx.reply(`✅ Фильм "${title}" успешно добавлен!`);
    }
});


admin_bot.launch();
console.log("🚀 Админ-бот запущен");

// Запуск основного бота
bot.launch();