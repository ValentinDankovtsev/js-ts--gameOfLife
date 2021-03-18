import { createGameOfLife } from "./createGameOfLife";

const gameWrapper = document.createElement("div");

document.body.appendChild(gameWrapper);

createGameOfLife(undefined, undefined, gameWrapper);
