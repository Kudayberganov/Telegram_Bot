// const { Telegraf, Markup } = require('telegraf');
// const fs = require('fs');

// // Токен бота (замени на свой)
// // const bot = new Telegraf('YOUR_ADMIN_BOT_TOKEN');
// // const ADMIN_ID = 123456789; // Замените на реальный ID администратора

// const bot = new Telegraf('7441122720:AAHQMtph0L6zRqeRCJBp9vulcRtvjV6cDr8');
// const ADMIN_ID = 6764836918;

// // Загружаем список фильмов
// let movies = {};
// try {
//     movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
// } catch (error) {
//     console.error('Ошибка загрузки базы фильмов:', error);
// }

// // Хранилище состояний пользователей
// const userStates = {};

// // Команда для добавления фильма
// bot.command('add_movie', (ctx) => {
//     if (ctx.from.id !== ADMIN_ID) {
//         return ctx.reply('У вас нет доступа к админ-панели!');
//     }

//     // Инициализация состояния пользователя
//     userStates[ctx.from.id] = { step: 'waiting_for_code' };
//     ctx.reply('Введите код нового фильма:');
// });

// // Обработчик текстовых сообщений
// bot.on('text', async (ctx) => {
//     const userId = ctx.from.id;
//     const userText = ctx.message.text.trim();

//     // Проверяем, есть ли пользователь в состоянии добавления фильма
//     if (!userStates[userId]) {
//         return ctx.reply('Вы не находитесь в процессе добавления фильма. Введите /add_movie.');
//     }

//     const userState = userStates[userId];

//     if (userState.step === 'waiting_for_code') {
//         if (movies[userText]) {
//             return ctx.reply('❌ Такой код уже существует! Введите другой код:');
//         }
//         userStates[userId] = { step: 'waiting_for_title', newMovie: { code: userText } };
//         return ctx.reply('Введите название фильма:');
//     }

//     if (userState.step === 'waiting_for_title') {
//         userState.newMovie.title = userText;
//         userState.step = 'waiting_for_year';
//         return ctx.reply('Введите год выпуска:');
//     }

//     if (userState.step === 'waiting_for_year') {
//         if (!/^\d{4}$/.test(userText)) {
//             return ctx.reply('❌ Пожалуйста, введите корректный год (4 цифры):');
//         }
//         userState.newMovie.year = userText;
//         userState.step = 'waiting_for_genre';
//         return ctx.reply('Введите жанр фильма:');
//     }

//     if (userState.step === 'waiting_for_genre') {
//         userState.newMovie.genre = userText;

//         // Сохраняем новый фильм
//         const { code, title, year, genre } = userState.newMovie;
//         movies[code] = `${title} (${year}), Жанр: ${genre}`;
//         saveMovies();

//         // Удаляем пользователя из памяти
//         delete userStates[userId];

//         return ctx.reply(`✅ Фильм "${title}" успешно добавлен!`);
//     }
// });

// // Функция сохранения фильмов в файл
// function saveMovies() {
//     fs.writeFileSync('./movies.json', JSON.stringify(movies, null, 2));
// }

// // Запуск бота
// bot.launch();

// const Movie = require("./models/Movie");

// async function addMovie(code, title, year, genre) {
//     const movie = new Movie({ code, title, year, genre });
//     await movie.save();
//     console.log(`✅ Фильм "${title}" добавлен`);
// }

const { Telegraf } = require("telegraf");
const Movie = require("./models/Movie");

const bot = new Telegraf("7441122720:AAHQMtph0L6zRqeRCJBp9vulcRtvjV6cDr8"); // Замени на свой токен
const ADMIN_ID = 6764836918;

const userStates = {};

bot.command("add_movie", (ctx) => {
    if (ctx.from.id !== ADMIN_ID) {
        return ctx.reply("У вас нет доступа к админ-панели!");
    }

    // Инициализация состояния пользователя
    userStates[ctx.from.id] = { step: "waiting_for_code" };
    ctx.reply("Введите код нового фильма:");
});

// Обработчик текстовых сообщений
bot.on("text", async (ctx) => {
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

// bot.command("add", (ctx) => {
//     ctx.reply("📥 Введите данные фильма в формате:\n\n`КОД | Название | Год | Жанр`", { parse_mode: "Markdown" });
//     ctx.session = { state: "waiting_for_movie" };
// });

// bot.on("text", async (ctx) => {
//     if (ctx.session?.state === "waiting_for_movie") {
//         const parts = ctx.message.text.split("|").map(p => p.trim());

//         if (parts.length !== 4) {
//             return ctx.reply("❌ Ошибка! Введите данные в формате: `КОД | Название | Год | Жанр`");
//         }

//         const [code, title, year, genre] = parts;

//         const movie = new Movie({ code, title, year, genre });
//         await movie.save();

//         ctx.reply(`✅ Фильм "${title}" (${year}) добавлен!`);
//         ctx.session = null; // Сбрасываем состояние
//     }
// });

bot.launch();
console.log("🚀 Админ-бот запущен");
