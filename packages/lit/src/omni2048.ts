import { html, unsafeCSS } from "lit";
import { animate } from "@lit-labs/motion";

import { type Direction, Game2048 } from "@omni2048/core";
import { customElement, property } from "lit/decorators.js";

import { TWElement } from "./lib/tailwind";
import styles from "./omni2048.css?inline";

import { classMap } from "lit/directives/class-map.js";

const ARROW_KEY_DIRECTION = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
} satisfies Record<string, Direction>;

const GRID_COLS = 4;
const CELL_SIZE = 100;
const GRID_GAP = 10;
const GRID_SIZE =
  // main
  GRID_COLS * CELL_SIZE +
  // gap
  (GRID_COLS + 1) * GRID_GAP;

@customElement("omni-2048")
export class Omni2048 extends TWElement {
  @property({ type: Array }) grid: number[][] = [];

  static styles = [TWElement.styles, unsafeCSS(styles)];

  private game: Game2048;

  constructor() {
    super();
    this.game = new Game2048();
    this.grid = this.game.getGrid();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this.handleKeyDown);
    super.disconnectedCallback();
  }

  move(direction: string): boolean {
    switch (direction) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        return this.game.move(ARROW_KEY_DIRECTION[direction]);
      default:
        return false;
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    const moved = this.move(e.key);
    if (moved) {
      this.grid = this.game.getGrid();
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div
        part="root"
        class="root relative"
        style="${`width: ${GRID_SIZE}px; height: ${GRID_SIZE}px;`}"
      >
        ${this.grid.flat().map((tile, index) => {
          const x = Math.floor(index / this.grid.length) as 0 | 1 | 2 | 3;
          const y = (index % this.grid.length) as 0 | 1 | 2 | 3;
          const classes = {
            "tile-x0-y0": x === 0 && y === 0,
            "tile-x0-y1": x === 0 && y === 1,
            "tile-x0-y2": x === 0 && y === 2,
            "tile-x0-y3": x === 0 && y === 3,
            "tile-x1-y0": x === 1 && y === 0,
            "tile-x1-y1": x === 1 && y === 1,
            "tile-x1-y2": x === 1 && y === 2,
            "tile-x1-y3": x === 1 && y === 3,
            "tile-x2-y0": x === 2 && y === 0,
            "tile-x2-y1": x === 2 && y === 1,
            "tile-x2-y2": x === 2 && y === 2,
            "tile-x2-y3": x === 2 && y === 3,
            "tile-x3-y0": x === 3 && y === 0,
            "tile-x3-y1": x === 3 && y === 1,
            "tile-x3-y2": x === 3 && y === 2,
            "tile-x3-y3": x === 3 && y === 3,
          };

          return html`
            <div
              part="tile"
              data-value="${tile}"
              class="tile ${classMap(classes)}"
              ${animate()}
            >
              <div class="tile-inner">${tile !== 0 ? tile : ""}</div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
