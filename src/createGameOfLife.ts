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
  const htmlEl = htmlElement;
  let sizeInputX = sizeX;
  let sizeInputY = sizeY;

  htmlEl.innerHTML = `<div class="field-wrapper"></div><button>Start</button></div>
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

  let field = createField(sizeX, sizeY);

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = Number(!field[y][x]);

    drawField(fieldWrapper, field, cellClickHandler);
  };

  drawField(fieldWrapper, field, cellClickHandler);

  function stopGame() {
    gameIsRunning = false;
    button.innerHTML = "Start";

    clearInterval(timer);
  }
  function startGame() {
    gameIsRunning = true;
    button.innerHTML = "Stop";

    timer = setInterval(() => {
      const currentField = JSON.parse(JSON.stringify(field));
      field = getNextState(currentField);
      const nextField = getNextState(field);
      const transformedField = transformField(field, nextField);
      drawField(fieldWrapper, transformedField, cellClickHandler);

      if (nextField.toString() === currentField.toString()) {
        stopGame();
      }

      if (!isAnyoneAlive(field)) {
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
    sizeInputX = Number(inputX.value);
    sizeInputY = Number(inputY.value);
    if (
      sizeInputY >= 1 &&
      sizeInputX >= 1 &&
      sizeInputY <= 100 &&
      sizeInputX <= 100
    ) {
      field = createField(sizeInputX, sizeInputY, field);
      drawField(fieldWrapper, field, cellClickHandler);
    } else {
      alert("Введите число от 1 до 100");
    }
  });

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
}
