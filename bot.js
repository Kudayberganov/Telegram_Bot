// const { Telegraf } = require("telegraf"); // Импортируем Telegraf
// const movies = require("./movies.json"); // Подключаем базу данных фильмов

// const bot = new Telegraf("7441122720:AAHQMtph0L6zRqeRCJBp9vulcRtvjV6cDr8"); // Замените ВАШ_ТОКЕН на токен вашего бота

// // Список каналов для проверки подписки
// const requiredChannels = ["@best_films077", "-1002337255080"]; // Замените на ваши каналы

// // Функция проверки подписки
// async function checkSubscription(ctx, userId) {
//     for (let channel of requiredChannels) {
//         const chatMember = await ctx.telegram.getChatMember(channel, userId);
//         if (
//             chatMember.status !== "member" &&
//             chatMember.status !== "administrator" &&
//             chatMember.status !== "creator"
//         ) {
//             return false; // Пользователь не подписан
//         }
//     }
//     return true; // Пользователь подписан
// }

// // Обработка команды /start
// bot.start(async (ctx) => {
//     const userId = ctx.from.id;
//     const isSubscribed = await checkSubscription(ctx, userId);

//     if (isSubscribed) {
//         ctx.reply(
//             "Привет! Ты уже подписан на все необходимые каналы. Отправь мне код фильма."
//         );
//     } else {
//         // const channelsList = requiredChannels.map((channel) => `➡️ [${channel}](${channel})`).join('\n');
//         const channelsList = requiredChannels
//             .map((channel) =>
//                 channel.startsWith("@")
//                     ? `➡️ [${channel}](https://t.me/${channel.slice(1)})`
//                     : `➡️ [Канал](https://t.me/c/${channel.slice(4)})`
//             )
//             .join("\n");
//         ctx.replyWithMarkdown(
//             `Привет! Пожалуйста, подпишись на следующие каналы, чтобы пользоваться ботом:\n${channelsList}\n\nПосле подписки нажми /start снова.`
//         );
//     }
// });

// // Обработка текстовых сообщений
// bot.on("text", async (ctx) => {
//     const userId = ctx.from.id;
//     const isSubscribed = await checkSubscription(ctx, userId);

//     if (!isSubscribed) {
//         ctx.reply("Сначала подпишись на каналы и нажми /start.");
//         return;
//     }

//     const userCode = ctx.message.text.trim(); // Получаем код от пользователя
//     const movie = movies[userCode]; // Ищем фильм в базе данных

//     if (movie) {
//         ctx.reply(`Фильм по коду ${userCode}: ${movie}`); // Если фильм найден
//     } else {
//         ctx.reply("Извините, но такого кода не существует."); // Если фильм не найден
//     }
// });

// // Запуск бота
// bot.launch().then(() => {
//     console.log("Бот успешно запущен!");
// });

require("dotenv").config();
const { Telegraf } = require("telegraf"); // Импортируем Telegraf
const movies = require("./movies.json"); // Подключаем базу данных фильмов

const bot = new Telegraf(process.env.BOT_TOKEN);
// const bot = new Telegraf('ВАШ_ТОКЕН'); // Замените ВАШ_ТОКЕН на токен вашего бота

// Список каналов для проверки подписки
const requiredChannels = ["@best_films077"]; // Замените на ваши каналы

// Функция проверки подписки
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

// Обработка команды /start
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

        const userCode = ctx.message.text.trim(); // Получаем код от пользователя
        const movie = movies[userCode]; // Ищем фильм в базе данных

        if (movie) {
            ctx.replyWithMarkdownV2(`Фильм по коду ${userCode}:\n${movie}`); // Если фильм найден
        } else {
            ctx.reply("Извините, но такого кода не существует."); // Если фильм не найден
        }

    // const userCode = ctx.message.text.trim(); // Получаем код от пользователя
    // const movie = movies[userCode]; // Ищем фильм в базе данных

    // if (movie) {
    //     // Формируем сообщение с кликабельной ссылкой
    //     const message = `[Твой фильм тут](${movie})`;

    //     // Отправляем сообщение с использованием MarkdownV2
    //     ctx.replyWithMarkdownV2(message);
    // } else {
    //     // Если фильм не найден
    //     ctx.reply("Извините, но такого кода не существует.");
    // }
});

// Обработка глобальных ошибок
process.on("uncaughtException", (err) => {
    console.error("Необработанная ошибка:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("Необработанное обещание:", reason);
});

// Запуск бота
bot.launch().then(() => {
    console.log("Бот успешно запущен!");
});
