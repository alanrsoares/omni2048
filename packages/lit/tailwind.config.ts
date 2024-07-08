import daisyui from "daisyui";
import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const GRID_COLS = 4;
const GRID_GAP = 10;
const CELL_SIZE = 100;

export default {
  content: ["./src/**/*.{html,ts}", "./index.html"],
  theme: {
    extend: {
      colors: {
        grid: "#bbada0",
        cell: "#cdc1b4",
        "light-content": "#a7a1a1",
        "dark-content": "#f9f7f7",
        "value-2": "#eee4da",
        "value-4": "#ede0c8",
        "value-8": "#f2b179",
        "value-16": "#f59e0b",
        "value-32": "#f97316",
        "value-64": "#fb6107",
        "value-128": "#fc530f",
        "value-256": "#fc400a",
        "value-512": "#fb3a00",
        "value-1024": "#f83600",
        "value-2048": "#f43400",
        "value-4096": "#e03e00",
        "value-8192": "#c73e00",
        "value-16384": "#a63e00",
        "value-32768": "#843e00",
        "value-65536": "#633e00",
      },
      spacing: {
        "grid-gap": "10px",
        "cell-size": "100px",
      },
    },
  },
  plugins: [
    daisyui,
    function ({ addComponents }: PluginAPI) {
      for (let x = 0; x < GRID_COLS; x++) {
        for (let y = 0; y < GRID_COLS; y++) {
          const translateX = x * CELL_SIZE + GRID_GAP * (1 + x);
          const translateY = y * CELL_SIZE + GRID_GAP * (1 + y);

          addComponents({
            [`.tile-x${x}-y${y}`]: {
              transform: `translate(${translateY}px, ${translateX}px)`,
            },
          });
        }
      }
    },
  ],
} satisfies Config;
