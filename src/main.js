// Запуск игры
//
// - создать элемент и добавить его на страницу
// - создать на этом элементе игру с помощью `createGameOfLife` с размерами поля x / y

const { createGameOfLife } = require("./createGameOfLife");

// - для проверки своего кода можно создать еще один элемент и создать вторую игру на этой же странице
const gameWrapper = document.createElement("div");

document.body.appendChild(gameWrapper);

createGameOfLife(10, 10, gameWrapper);
