import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  variants: {
    primary: {
      true: {
        bg: "buttonPrimary.bg",
        color: "buttonPrimary.text",
        fontFamily: "customHeading",
        textTransform: "uppercase",
        borderRadius: "10em",
        letterSpacing: ".1em",
        wordSpacing: "2px",
        paddingInline: "5",
        border: "0px",
        fontSize: ".8em",
        align: "center",
        justify: "center",
        h: "42px",
        boxSizing: "border-box",
        _hover: {
          bg: "buttonPrimary.hoverBg",
          color: "buttonPrimary.hoverText",
        },
        _active: {
          bg: "buttonPrimary.bg",
          color: "buttonPrimary.text",
        },
        _focus: {
          bg: "buttonPrimary.bg",
          color: "buttonPrimary.text",
          boxShadow: "outline",
        },
        '[data-state="open"] &, &[data-state="open"]': {
          bg: "buttonPrimary.activeBg",
          color: "buttonPrimary.activeText",
        },
      },
    },
    secondary: {
      true: {
        bg: "buttonSecondary.bg",
        color: "buttonPrimary.text",
        fontFamily: "customHeading",
        textTransform: "uppercase",
        borderRadius: "100px",
        paddingInline: "5",
        border: "0px",
        fontSize: ".8em",
        align: "center",
        justify: "center",
        h: "42px",
        _hover: {
          bg: "buttonSecondary.hoverBg",
          color: "buttonSecondary.hoverText",
        },
      },
    },
  },
});
const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
    },
    tokens: {
      fonts: {
        body: { value: "'Poppins', sans-serif" },
        heading: { value: "'Nebulica', sans-serif" },
      },
      fontWeights: {
        extralight: { value: 200 },
        normal: { value: 400 },
        bold: { value: 700 },
        black: { value: 900 },
      },
      colors: {
        brand: {
          purple: {
            50: { value: "#F2F1FF" },
            500: { value: "#ABAFFF" },
            900: { value: "#666CDD" },
          },
          gold: {
            500: { value: "#FFB431" },
          },
          gray: {
            50: { value: "#FAFAFA" },
            100: { value: "#D5D5D5" },
            300: { value: "#777777" },
            600: { value: "#666666" },
            900: { value: "#424242" },
          },
        },
        transparent: { value: "transparent" },
        black: { value: "#000" },
        white: { value: "#fff" },
        whiteAlpha: {
          50: { value: "rgba(255, 255, 255, 0.04)" },
          100: { value: "rgba(255, 255, 255, 0.06)" },
          200: { value: "rgba(255, 255, 255, 0.08)" },
          300: { value: "rgba(255, 255, 255, 0.16)" },
          400: { value: "rgba(255, 255, 255, 0.24)" },
          500: { value: "rgba(255, 255, 255, 0.36)" },
          600: { value: "rgba(255, 255, 255, 0.48)" },
          700: { value: "rgba(255, 255, 255, 0.64)" },
          800: { value: "rgba(255, 255, 255, 0.80)" },
          900: { value: "rgba(255, 255, 255, 0.92)" },
        },
        blackAlpha: {
          50: { value: "rgba(0, 0, 0, 0.04)" },
          100: { value: "rgba(0, 0, 0, 0.06)" },
          200: { value: "rgba(0, 0, 0, 0.08)" },
          300: { value: "rgba(0, 0, 0, 0.16)" },
          400: { value: "rgba(0, 0, 0, 0.24)" },
          500: { value: "rgba(0, 0, 0, 0.36)" },
          600: { value: "rgba(0, 0, 0, 0.48)" },
          700: { value: "rgba(0, 0, 0, 0.64)" },
          800: { value: "rgba(0, 0, 0, 0.80)" },
          900: { value: "rgba(0, 0, 0, 0.92)" },
        },
        gray: {
          50: { value: "#F7FAFC" },
          100: { value: "#EDF2F7" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E0" },
          400: { value: "#A0AEC0" },
          500: { value: "#718096" },
          600: { value: "#4A5568" },
          700: { value: "#2D3748" },
          800: { value: "#1A202C" },
          900: { value: "#171923" },
          1000: { value: "#101118" },
        },
        red: {
          50: { value: "#FFF5F5" },
          100: { value: "#FED7D7" },
          200: { value: "#FEB2B2" },
          300: { value: "#FC8181" },
          400: { value: "#F56565" },
          500: { value: "#E53E3E" },
          600: { value: "#C53030" },
          700: { value: "#9B2C2C" },
          800: { value: "#822727" },
          900: { value: "#63171B" },
        },
        orange: {
          50: { value: "#FFFAF0" },
          100: { value: "#FEEBC8" },
          200: { value: "#FBD38D" },
          300: { value: "#F6AD55" },
          400: { value: "#ED8936" },
          500: { value: "#DD6B20" },
          600: { value: "#C05621" },
          700: { value: "#9C4221" },
          800: { value: "#7B341E" },
          900: { value: "#652B19" },
        },
        yellow: {
          50: { value: "#FFFFF0" },
          100: { value: "#FEFCBF" },
          200: { value: "#FAF089" },
          300: { value: "#F6E05E" },
          400: { value: "#ECC94B" },
          500: { value: "#D69E2E" },
          600: { value: "#B7791F" },
          700: { value: "#975A16" },
          800: { value: "#744210" },
          900: { value: "#5F370E" },
        },
        green: {
          50: { value: "#F0FFF4" },
          100: { value: "#C6F6D5" },
          200: { value: "#9AE6B4" },
          300: { value: "#68D391" },
          400: { value: "#48BB78" },
          500: { value: "#38A169" },
          600: { value: "#2F855A" },
          700: { value: "#276749" },
          800: { value: "#22543D" },
          900: { value: "#1C4532" },
        },
        teal: {
          50: { value: "#E6FFFA" },
          100: { value: "#B2F5EA" },
          200: { value: "#81E6D9" },
          300: { value: "#4FD1C5" },
          400: { value: "#38B2AC" },
          500: { value: "#319795" },
          600: { value: "#2C7A7B" },
          700: { value: "#285E61" },
          800: { value: "#234E52" },
          900: { value: "#1D4044" },
        },
        blue: {
          50: { value: "#EBF8FF" },
          100: { value: "#BEE3F8" },
          200: { value: "#90CDF4" },
          300: { value: "#63B3ED" },
          400: { value: "#4299E1" },
          500: { value: "#3182CE" },
          600: { value: "#2B6CB0" },
          700: { value: "#2C5282" },
          800: { value: "#2A4365" },
          900: { value: "#1A365D" },
        },
        cyan: {
          50: { value: "#EDFDFD" },
          100: { value: "#C4F1F9" },
          200: { value: "#9DECF9" },
          300: { value: "#76E4F7" },
          400: { value: "#0BC5EA" },
          500: { value: "#00B5D8" },
          600: { value: "#00A3C4" },
          700: { value: "#0987A0" },
          800: { value: "#086F83" },
          900: { value: "#065666" },
        },
        purple: {
          50: { value: "#FAF5FF" },
          100: { value: "#E9D8FD" },
          200: { value: "#D6BCFA" },
          300: { value: "#B794F4" },
          400: { value: "#9F7AEA" },
          500: { value: "#805AD5" },
          600: { value: "#6B46C1" },
          700: { value: "#553C9A" },
          800: { value: "#44337A" },
          900: { value: "#322659" },
        },
        pink: {
          50: { value: "#FFF5F7" },
          100: { value: "#FED7E2" },
          200: { value: "#FBB6CE" },
          300: { value: "#F687B3" },
          400: { value: "#ED64A6" },
          500: { value: "#D53F8C" },
          600: { value: "#B83280" },
          700: { value: "#97266D" },
          800: { value: "#702459" },
          900: { value: "#521B41" },
        },
      },
    },
    semanticTokens: {
      fonts: {
        customHeading: { value: "{fonts.heading}" },
      },
      colors: {
        bg: {
          root: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.1000}" },
          },
          pill: {
            value: { _light: "{colors.gray.100}", _dark: "{colors.gray.800}" },
          },
          card: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.1000}" },
          },
        },
        layoutSecondary: {
          bg: {
            value: {
              _light: "{colors.brand.purple.500}",
              _dark: "{colors.brand.gray.900}",
            },
          },
          text: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.white}",
            },
          },
          border: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.brand.gray.600}",
            },
          },
        },
        layoutPrimary: {
          bg: {
            value: {
              _light: "{colors.brand.gray.50}",
              _dark: "{colors.brand.gray.900}",
            },
          },
          text: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.white}",
            },
          },
        },
        buttonPrimary: {
          bg: {
            value: {
              _light: "{colors.brand.purple.900}",
              _dark: "{colors.brand.purple.900}",
            },
          },
          text: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.white}",
            },
          },
          hoverBg: {
            value: {
              _light: "{colors.brand.gold.500}",
              _dark: "{colors.brand.gold.500}",
            },
          },
          hoverText: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.black}",
            },
          },
          activeBg: {
            value: {
              _light: "{colors.brand.gray.900}",
              _dark: "{colors.brand.gray.100}",
            },
          },
          activeText: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.black}",
            },
          },
        },
        buttonSecondary: {
          bg: {
            value: {
              _light: "{colors.brand.gray.100}",
              _dark: "{colors.brand.gray.300}",
            },
          },
          text: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.white}",
            },
          },
          hoverBg: {
            value: {
              _light: "{colors.brand.gold.500}",
              _dark: "{colors.brand.gold.500}",
            },
          },
          hoverText: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.black}",
            },
          },
        },
        banner: {
          bg: {
            value: {
              _light: "{colors.brand.purple.900}",
              _dark: "{colors.brand.purple.900}",
            },
          },
          text: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.white}",
            },
          },
        },
        splash: {
          bg: {
            value: {
              _light: "transparent",
              _dark: "transparent",
            },
          },
          text: {
            value: {
              _light: "{colors.brand.purple.900}",
              _dark: "{colors.brand.purple.900}",
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
