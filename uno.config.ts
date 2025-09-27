import {
    defineConfig,
    presetAttributify,
    presetWind3,
    transformerAttributifyJsx,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";
import presetIcons from "@unocss/preset-icons";
import presentTheme from "@unocss/preset-theme";
import { myTheme } from "./uno.theme";
import type { Theme } from "@unocss/preset-theme";

export default defineConfig({
    export const myTheme = {
        default: {
            colors: {
                primary: "#1fa1fb",
                warning: "#eba049",
                danger: "#fb696e",
                info: "#909399",
            },
        },
        peaple: {
            colors: {
                primary: "#987D9A",
                warning: "#BB9AB1",
                danger: "#EECEB9",
                info: "#FEFBD8",
            },
        },
        spring: {
            colors: {
                primary: "#D8EFD3",
                warning: "#95D2B3",
                danger: "#55AD9B",
                info: "#F1F8E8",
            },
        },
    };
    // ...UnoCSS options
    presets: [
        presetAttributify({
            /* preset options */
        }),
        presetWind3(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presentTheme<Theme>({
            theme: myTheme,
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerAttributifyJsx(),
        transformerVariantGroup(),
    ],
    shortcuts: [
        [
            "btn",
            "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
        ],
        [
            "icon-btn",
            "text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none",
        ],
    ],
    theme: {
        fontSize: {
            micro: ["0.625rem", "1rem"],
            xs: ["0.75rem", "1rem"],
            sm: ["0.875rem", "1.125rem"],
            base: ["1rem", "1.5rem"],
            md: ["1.125rem", "1.5rem"],
            lg: ["1.25rem", "1.5rem"],
            xl: ["1.375rem", "2rem"],
        },
    },
});