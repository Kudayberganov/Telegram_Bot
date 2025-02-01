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

// require("dotenv").config();
// const { Telegraf } = require("telegraf"); // Импортируем Telegraf
// const movies = require("./movies.json"); // Подключаем базу данных фильмов

// const bot = new Telegraf(process.env.BOT_TOKEN);
// // const bot = new Telegraf('ВАШ_ТОКЕН'); // Замените ВАШ_ТОКЕН на токен вашего бота

// // Список каналов для проверки подписки
// const requiredChannels = ["@best_films077"]; // Замените на ваши каналы

// // Функция проверки подписки
// async function checkSubscription(ctx, userId) {
//     for (let channel of requiredChannels) {
//         try {
//             const chatMember = await ctx.telegram.getChatMember(
//                 channel,
//                 userId
//             );
//             if (
//                 chatMember.status !== "member" &&
//                 chatMember.status !== "administrator" &&
//                 chatMember.status !== "creator"
//             ) {
//                 return false; // Пользователь не подписан
//             }
//         } catch (error) {
//             console.error(
//                 `Ошибка проверки подписки на канал ${channel}:`,
//                 error.message
//             );
//             return false; // Если канал не найден или другая ошибка
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
//             "Привет! Ты уже подписан на все необходимые каналы. Можешь отправить мне КОД фильма."
//         );
//     } else {
//         const channelsList = requiredChannels
//             .map((channel) =>
//                 channel.startsWith("@")
//                     ? `➡️ [${channel}](https://t.me/${channel.slice(1)})`
//                     : `➡️ [Канал](https://t.me/c/${channel.slice(4)})`
//             )
//             .join("\n");
//         ctx.replyWithMarkdown(
//             `Привет! Пожалуйста, подпишись на следующие каналы, чтобы пользоваться ботом:\n\n${channelsList}\n\nПосле подписки нажми /start снова.`
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

//         const userCode = ctx.message.text.trim(); // Получаем код от пользователя
//         const movie = movies[userCode]; // Ищем фильм в базе данных

//         if (movie) {
//             ctx.replyWithMarkdownV2(`Фильм по коду ${userCode}:\n${movie}`); // Если фильм найден
//         } else {
//             ctx.reply("Извините, но такого кода не существует."); // Если фильм не найден
//         }

//     });

// // Обработка глобальных ошибок
// process.on("uncaughtException", (err) => {
//     console.error("Необработанная ошибка:", err);
// });

// process.on("unhandledRejection", (reason) => {
//     console.error("Необработанное обещание:", reason);
// });

// // Запуск бота
// bot.launch().then(() => {
//     console.log("Бот успешно запущен!");
// });

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





// РАБОТАЮЩИЙ КОД
// require("dotenv").config();
// const { Telegraf } = require("telegraf"); // Импортируем Telegraf
// const http = require("http"); // Импортируем http для создания сервера
// const movies = require("./movies.json"); // Подключаем базу данных фильмов

// const bot = new Telegraf(process.env.BOT_TOKEN);
// // const bot = new Telegraf('ВАШ_ТОКЕН'); // Замените ВАШ_ТОКЕН на токен вашего бота

// // Список каналов для проверки подписки
// const requiredChannels = ["@best_films077"]; // Замените на ваши каналы

// // Функция проверки подписки
// async function checkSubscription(ctx, userId) {
//     for (let channel of requiredChannels) {
//         try {
//             const chatMember = await ctx.telegram.getChatMember(
//                 channel,
//                 userId
//             );
//             if (
//                 chatMember.status !== "member" &&
//                 chatMember.status !== "administrator" &&
//                 chatMember.status !== "creator"
//             ) {
//                 return false; // Пользователь не подписан
//             }
//         } catch (error) {
//             console.error(
//                 `Ошибка проверки подписки на канал ${channel}:`,
//                 error.message
//             );
//             return false; // Если канал не найден или другая ошибка
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
//             "Привет! Ты уже подписан на все необходимые каналы. Можешь отправить мне КОД фильма."
//         );
//     } else {
//         const channelsList = requiredChannels
//             .map((channel) =>
//                 channel.startsWith("@")
//                     ? `➡️ [${channel}](https://t.me/${channel.slice(1)})`
//                     : `➡️ [Канал](https://t.me/c/${channel.slice(4)})`
//             )
//             .join("\n");
//         ctx.replyWithMarkdown(
//             `Привет! Пожалуйста, подпишись на следующие каналы, чтобы пользоваться ботом:\n\n${channelsList}\n\nПосле подписки нажми /start снова.`
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
//         ctx.replyWithMarkdownV2(`Фильм по коду ${userCode}:\n${movie}`); // Если фильм найден
//     } else {
//         ctx.reply("Извините, но такого кода не существует."); // Если фильм не найден
//     }
// });

// // Обработка глобальных ошибок
// process.on("uncaughtException", (err) => {
//     console.error("Необработанная ошибка:", err);
// });

// process.on("unhandledRejection", (reason) => {
//     console.error("Необработанное обещание:", reason);
// });

// // Фиктивный сервер для Render
// const PORT = process.env.PORT || 3000; // Render передаёт порт через переменную окружения
// http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Бот работает!"); // Выводим простое сообщение
// }).listen(PORT, () => {
//     console.log(`Сервер запущен на порту ${PORT}`);
// });

// // Запуск бота
// bot.launch().then(() => {
//     console.log("Бот успешно запущен!");
// });




require("dotenv").config();
const { Telegraf, Markup, session } = require("telegraf");
const fs = require("fs"); // Добавлено для работы с файлами
const http = require("http");
// const movies = require("./movies.json");
// const setupAdminPanel = require("./adminPanel"); // Импортируем админку
// const setupMovieSearch = require("./movieSearch");



// const bot = new Telegraf(process.env.BOT_TOKEN);

// Твой Telegram ID (замени на свой)
// const ADMIN_ID = 6764836918; 

const requiredChannels = ["@best_films077"];

// Загружаем фильмы из базы данных
let movies = {};
try {
    movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
} catch (error) {
    console.error('Ошибка загрузки базы фильмов:', error);
}

// Проверка подписки на канал
async function checkSubscription(ctx, userId) {
    for (let channel of requiredChannels) {
        try {
            const chatMember = await ctx.telegram.getChatMember(channel, userId);
            if (!["member", "administrator", "creator"].includes(chatMember.status)) {
                return false;
            }
        } catch (error) {
            console.error(`Ошибка проверки подписки на ${channel}:`, error.message);
            return false;
        }
    }
    return true;
}


// 🟢 Команда /start
bot.start(async (ctx) => {
    const userId = ctx.from.id;
    const isSubscribed = await checkSubscription(ctx, userId);

    if (isSubscribed) {
        ctx.reply("Привет! Ты подписан. Отправь мне КОД фильма.");
    } else {
        const channelsList = requiredChannels.map((channel) => `[${channel}](https://t.me/${channel.slice(1)})`).join("\n");
        ctx.replyWithMarkdown(`Подпишись на каналы:\n\n${channelsList}\n\nПосле подписки нажми /start снова.`);
    }
});



// setupMovieSearch(bot);

// bot.use(session());
// setupAdminPanel(bot, ADMIN_ID);


// 🔎 Поиск фильма по коду
bot.on("text", async (ctx) => {
    const userId = ctx.from.id;
    const isSubscribed = await checkSubscription(ctx, userId);

    if (!isSubscribed) return ctx.reply("Сначала подпишись на каналы и нажми /start.");

    const userCode = ctx.message.text.trim();
    const movie = movies[userCode];

    if (movie) {
        ctx.replyWithMarkdownV2(`🎬 Фильм по коду ${userCode}:\n${movie}`);
    } else {
        ctx.reply("Извините, но такого кода не существует.");
    }
});


// 📌 Админ-панель
// bot.command("admin", (ctx) => {
//     if (ctx.from.id !== ADMIN_ID) {
//         return ctx.reply("У вас нет доступа к админ-панели!");
//     }

//     return ctx.reply("Добро пожаловать в админ-панель!", Markup.inlineKeyboard([
//         [Markup.button.callback("➕ Добавить фильм", "add_movie")],
//         [Markup.button.callback("✏️ Редактировать фильм", "edit_movie")],
//         [Markup.button.callback("❌ Удалить фильм", "delete_movie")]
//     ]));
// });

// Подключаем сессию для хранения текущего состояния ввода

// bot.use((ctx, next) => {
//     if (!ctx.session) {
//         ctx.session = {};
//     }
//     return next();
// });



// Загрузка фильмов из файла
// let moviess = {};
// try {
//     moviess = JSON.parse(fs.readFileSync("./movies.json", "utf8"));
// } catch (error) {
//     console.error("Ошибка загрузки базы фильмов:", error);
// }

// Функция сохранения фильмов в JSON
// function saveMovies() {
//     fs.writeFileSync("./movies.json", JSON.stringify(moviess, null, 2));
// }

// // 🟢 Добавление фильма
// bot.action("add_movie", async (ctx) => {
//     ctx.session.state = "waiting_for_code"; // Устанавливаем шаг ожидания кода
//     await ctx.reply("Введите код нового фильма:");
// });

// bot.hears("text", async (ctx) => {
//     const userText = ctx.message.text.trim();

//     if (ctx.session.state === "waiting_for_code") {
//         if (moviess[userText]) {
//             return ctx.reply("❌ Такой код уже существует! Введите другой:");
//         }
//         ctx.session.newMovie = { code: userText };
//         ctx.session.state = "waiting_for_title";
//         return ctx.reply("Введите название фильма:");
//     }

//     if (ctx.session.state === "waiting_for_title") {
//         ctx.session.newMovie.title = userText;
//         ctx.session.state = "waiting_for_year";
//         return ctx.reply("Введите год выпуска:");
//     }

//     if (ctx.session.state === "waiting_for_year") {
//         if (!/^\d{4}$/.test(userText)) {
//             return ctx.reply("❌ Пожалуйста, введите корректный год (4 цифры):");
//         }
//         ctx.session.newMovie.year = userText;
//         ctx.session.state = "waiting_for_genre";
//         return ctx.reply("Введите жанр фильма:");
//     }

//     if (ctx.session.state === "waiting_for_genre") {
//         ctx.session.newMovie.genre = userText;

//         // Сохраняем новый фильм
//         const { code, title, year, genre } = ctx.session.newMovie;
//         moviess[code] = `${title} (${year}), Жанр: ${genre}`;
//         saveMovies();

//         ctx.session.state = null; // Сбрасываем состояние
//         ctx.session.newMovie = null; // Очищаем временные данные

//         return ctx.reply(`✅ Фильм "${title}" успешно добавлен!`);
//     }
// });


// // 🟡 Редактирование фильма
// bot.action("edit_movie", (ctx) => {
//     ctx.reply("Введите код фильма, который хотите изменить:");
//     bot.on("text", (ctx) => {
//         const code = ctx.message.text.trim();
//         if (!movies[code]) return ctx.reply("Фильм с таким кодом не найден!");

//         ctx.reply("Введите новое название фильма:");
//         bot.on("text", (ctx) => {
//             const newTitle = ctx.message.text.trim();

//             ctx.reply("Введите новый год выпуска:");
//             bot.on("text", (ctx) => {
//                 const newYear = ctx.message.text.trim();

//                 ctx.reply("Введите новый жанр:");
//                 bot.on("text", (ctx) => {
//                     const newGenre = ctx.message.text.trim();

//                     movies[code] = `${newTitle} (${newYear}), Жанр: ${newGenre}`;
//                     saveMovies();
//                     ctx.reply("✅ Фильм успешно обновлен!");
//                 });
//             });
//         });
//     });
// });

// // 🔴 Удаление фильма
// bot.action("delete_movie", (ctx) => {
//     ctx.reply("Введите код фильма, который хотите удалить:");
//     bot.on("text", (ctx) => {
//         const code = ctx.message.text.trim();
//         if (!movies[code]) return ctx.reply("Фильм с таким кодом не найден!");

//         delete movies[code];
//         saveMovies();
//         ctx.reply("❌ Фильм успешно удалён!");
//     });
// });

// // ⚙️ Функция сохранения JSON
// function saveMovies() {
//     fs.writeFileSync("./movies.json", JSON.stringify(movies, null, 4));
// }


// Фиктивный сервер для Render
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Бот работает!");
}).listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

// Запуск бота
bot.launch().then(() => console.log("Бот успешно запущен!"));


// // 🟢 Команда /start
// bot.start(async (ctx) => {
//     const userId = ctx.from.id;
//     const isSubscribed = await checkSubscription(ctx, userId);

//     if (isSubscribed) {
//         ctx.reply("Привет! Ты подписан. Отправь мне КОД фильма.");
//     } else {
//         const channelsList = requiredChannels.map((channel) => `[${channel}](https://t.me/${channel.slice(1)})`).join("\n");
//         ctx.replyWithMarkdown(`Подпишись на каналы:\n\n${channelsList}\n\nПосле подписки нажми /start снова.`);
//     }
// });

// // 🔎 Поиск фильма по коду
// bot.on("text", async (ctx) => {
//     const userId = ctx.from.id;
//     const isSubscribed = await checkSubscription(ctx, userId);

//     if (!isSubscribed) return ctx.reply("Сначала подпишись на каналы и нажми /start.");

//     const userCode = ctx.message.text.trim();
//     const movie = movies[userCode];

//     if (movie) {
//         ctx.replyWithMarkdownV2(`🎬 Фильм по коду ${userCode}:\n${movie}`);
//     } else {
//         ctx.reply("Извините, но такого кода не существует.");
//     }
// });





    // // 🟢 Добавление фильма
    // bot.action("add_movie", (ctx) => {
    //     ctx.reply("Введите код нового фильма:");
    //     bot.on("text", (ctx) => {
    //         const code = ctx.message.text.trim();
    //         if (movies[code]) return ctx.reply("Такой код уже существует!");
            
    //         ctx.reply("Введите название фильма:");
    //         bot.on("text", (ctx) => {
    //             const title = ctx.message.text.trim();
                
    //             ctx.reply("Введите год выпуска:");
    //             bot.on("text", (ctx) => {
    //                 const year = ctx.message.text.trim();
                    
    //                 ctx.reply("Введите жанр фильма:");
    //                 bot.on("text", (ctx) => {
    //                     const genre = ctx.message.text.trim();
    
    //                     movies[code] = `${title} (${year}), Жанр: ${genre}`;
    //                     saveMovies();
    //                     ctx.reply("✅ Фильм успешно добавлен!");
    //                 });
    //             });
    //         });
    //     });
    // });