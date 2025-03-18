import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react"
import { defaultSystem } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
        colors: {
            red: { value: "#ff0000" }, 
            darkred: { value: "#8b0000" }, 
            green: { value: "#008000" }, 
            darkgreen: { value: "#006400" }, 
            brand: {
                50: { value: "red" },
                100: { value: "#ededed" },
                200: { value: "#d3d3d3" },
                300: { value: "#b3b3b3" },
                400: { value: "#a0a0a0" },
                500: { value: "#898989" },
                600: { value: "#6c6c6c" },
                700: { value: "#202020" }, 
                800: { value: "#121212" },
                900: { value: "#111" },
            },
        },
    },
    semanticTokens: {
        colors: {
          danger: {
            value: { _light: "{colors.red}", _dark: "{colors.darkred}" }, 
          },
          success: {
            value: { _light: "{colors.green}", _dark: "{colors.darkgreen}" },
          },
        },
    },
  },
})

export const system = createSystem(defaultBaseConfig, customConfig)

