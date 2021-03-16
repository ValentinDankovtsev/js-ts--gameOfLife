/* eslint-disable no-cond-assign */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import { createField } from "./createField";
import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";
import { transformField } from "./transormField";

/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */

export function createGameOfLife(
  sizeX = 10,
  sizeY = 10,
  htmlElement: HTMLElement
): void {
  let gameIsRunning = false;
  let timer: NodeJS.Timeout;

  // Создать блок для поля
  // Создать кнопку управления игрой
  htmlElement.innerHTML = `<div class="field-wrapper"></div><button>Start</button></div>
  <input type='range' id='speedRangeSlider' name='speedRangeSlider' min='0' max='900' value='300' step='100'>
  <input id='numberX' type='number' min='1' max='100' value=${sizeX} step='1'>
  <input id='numberY' type='number' min='1' max='100' value=${sizeY} step='1'>
  <button class='butField'>fieldSize</button>`;
  let speed = 800;

  const fieldWrapper = htmlElement.querySelector(
    ".field-wrapper"
  ) as HTMLDivElement;

  const button = htmlElement.querySelector("button") as HTMLButtonElement;
  const speedRangeSlider = htmlElement.querySelector(
    "#speedRangeSlider"
  ) as HTMLInputElement;
  // const inputSize = htmlElement.querySelector(".inputSize");
  // Создать поле заданного размера
  let field = createField(sizeX, sizeY);

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = Number(!field[y][x]);

    drawField(fieldWrapper, field, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  drawField(fieldWrapper, field, cellClickHandler);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame() {
    gameIsRunning = false;
    button.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
  }
  function startGame() {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;
    button.innerHTML = "Stop";
    // - запустить таймер для обновления поля
    timer = setInterval(() => {
      // В таймере обновления поля
      // - посчитать новое состояние поля
      // - отрисовать новое состояние поля
      // - проверить, что есть живые клетки
      // - если живых клеток нет
      //    - остановить таймер
      //    - вывести сообщение
      const currentField = JSON.parse(JSON.stringify(field));
      field = getNextState(currentField);
      const nextField = getNextState(field);
      const transformedField = transformField(field, nextField);
      drawField(fieldWrapper, transformedField, cellClickHandler);

      if (nextField.toString() === currentField.toString()) {
        stopGame();
      }

      if (!isAnyoneAlive(field)) {
        // eslint-disable-next-line no-alert
        alert("Death on the block");
        stopGame();
      }
    }, speed);

    speedRangeSlider.addEventListener("change", (): void => {
      clearInterval(timer);
      const sliderValue = Number(speedRangeSlider.value);
      speed = 1000 - sliderValue;
      startGame();
    });
  }
  const inputX = htmlElement.querySelector("#numberX") as HTMLInputElement;
  const inputY = htmlElement.querySelector("#numberY") as HTMLInputElement;
  const butField = htmlElement.querySelector(".butField");
  butField?.addEventListener("click", () => {
    sizeX = Number(inputX.value);
    sizeY = Number(inputY.value);

    field = createField(sizeX, sizeY, field);

    drawField(fieldWrapper, field, cellClickHandler);
  });

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });

  inputX.addEventListener("keypress", (e) => {
    const char = e.key;
    if (char !== "" && !char.match(/[0-9]/)) {
      e.preventDefault();
      return false;
    }
    return char;
  });

  inputY.addEventListener("keypress", (e) => {
    const char = e.key;
    if (char !== "" && !char.match(/[0-9]/)) {
      e.preventDefault();
      return false;
    }
    return char;
  });
}
