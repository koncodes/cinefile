import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const containerRecipe = defineRecipe({
  base: {
    maxW: "7xl",
    paddingInline: { base: "6", md: "10" },
  },
  variants: {
    variant: {
      homePage: {
        paddingTop: "5em",
        paddingBottom: "6em",
      },
    },
  },
});

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
        h: "44px",
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
          bg: "buttonPrimary.bg",
          color: "buttonPrimary.text",
        },
      },
    },
    secondary: {
      true: {
        bg: "buttonSecondary.bg",
        color: "buttonSecondary.text",
        fontFamily: "customHeading",
        textTransform: "uppercase",
        borderRadius: "100px",
        paddingInline: "5",
        border: "0px",
        fontSize: ".8em",
        align: "center",
        justify: "center",
        h: "44px",
        _hover: {
          bg: "buttonSecondary.hoverBg",
          color: "buttonSecondary.hoverText",
        },
        '[data-state="open"] &, &[data-state="open"]': {
          bg: "buttonSecondary.bg",
          color: "buttonSecondary.text",
        },
      },
    },
    tertiary: {
      true: {
        bg: "buttonTertiary.bg",
        color: "buttonTertiary.text",
        fontFamily: "customHeading",
        textTransform: "uppercase",
        borderRadius: "100px",
        padding: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "buttonPrimary.bg",
        fontSize: ".85em",
        align: "center",
        justify: "center",
        h: "44px",
        w: "44px",
        _hover: {
          bg: "buttonTertiary.hoverBg",
          color: "buttonTertiary.hoverText",
          borderColor: "buttonTertiary.hoverBorder",
        },
        '[data-state="open"] &, &[data-state="open"]': {
          bg: "buttonTertiary.bg",
          color: "buttonTertiary.text",
          borderColor: "buttonTertiary.hoverBorder",
        },
        "& path": {
          transform: "scale(.87)",
          transformOrigin: "center",
        },
      },
    },
    quaternary: {
      true: {
        bg: "buttonSecondary.bg",
        color: "buttonSecondary.text",
        fontFamily: "customHeading",
        textTransform: "uppercase",
        borderRadius: "100px",
        paddingInline: "5",
        border: "0px",
        fontSize: ".8em",
        align: "center",
        justify: "center",
        h: "44px",
        _hover: {
          bg: "buttonSecondary.bg",
          color: "brand.solid",
        },
        '[data-state="open"] &, &[data-state="open"]': {
          bg: "buttonSecondary.bg",
          color: "brand.solid",
        },
      },
    },
    quinary: {
      true: {
        background: "transparent",
        color: "layoutPrimary.text",
        borderColor: "border.button",
        borderRadius: "100px",
        paddingInline: "4",
        paddingBlock: "2.5",
        h: "auto",
        _hover: {
          bg: "transparent",
          color: "layoutPrimary.text",
          borderColor: "layoutPrimary.text",
        },
        '[data-state="open"] &, &[data-state="open"]': {
          bg: "transparent",
          color: "layoutPrimary.text",
          borderColor: "layoutPrimary.text",
        },
      },
    },
    variant: {
      outline: {
        borderColor: "border.card",
        borderRadius: "100px",
        paddingInline: "4",
        paddingBlock: "2.5",
        h: "auto",
        _hover: {
          bg: "transparent",
          color: "layoutPrimary.text",
          borderColor: "layoutPrimary.text",
        },
        '[data-state="open"] &, &[data-state="open"]': {
          bg: "transparent",
          color: "layoutPrimary.text",
          borderColor: "layoutPrimary.text",
        },
      },
    },
  },
});

const inputRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderColor: "border.card",
        borderRadius: "30px",
        paddingInline: "4",
        paddingBlock: "2.5",
        h: "auto",
        outlineWidth: "0",
        _focus: {
          outlineWidth: "0",
        },
      },
    },
  },
});

const selectTextarea = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderColor: "border.card",
        borderRadius: "20px",
        paddingInline: "4",
        paddingBlock: "2.5",
        h: "auto",
        _focus: {
          outlineWidth: "0",
        },
      },
    },
  },
});

const selectRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderColor: "border.card",
        borderRadius: "30px",
        paddingInline: "4",
        paddingBlock: "2.5",
        h: "auto",
      },
    },
  },
});

const nativeSelectRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderColor: "border.card",
        borderRadius: "30px",
        paddingInline: "4",
        paddingBlock: "2.5",
        h: "auto",
      },
    },
  },
});

const badgeRecipe = defineRecipe({
  variants: {
    primary: {
      true: {
        bg: "transparent",
        border: "1px",
        borderStyle: "solid",
        borderColor: "border.card",
        borderRadius: "5px",
        padding: "3",
        paddingBlock: "1",
      },
    },
    secondary: {
      true: {
        bg: "transparent",
        border: "1px",
        borderStyle: "solid",
        borderColor: "border.tag",
        borderRadius: "5px",
        padding: "3",
        paddingBlock: "1",
      },
    },
    variant: {
      subtle: {
        borderRadius: "30px",
        padding: "3",
      },
      outline: {
        borderWidth: "1px",
        borderStyle: "solid",
        outlineColor: "border.badge",
        borderColor: "border.badge",
        paddingBlock: "1",
        boxShadow: "none",
      },
      solid: {
        borderWidth: "0",
        outlineWidth: "0",
        borderStyle: "solid",
        outlineColor: "border.badge",
        borderColor: "border.badge",
        paddingBlock: "1",
        boxShadow: "none",
        bg: "border.badge",
        color: "layoutPrimary.text",
        letterSpacing: "0.075em",
      },
    },
  },
});
const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
      container: containerRecipe,
      input: inputRecipe,
      select: selectRecipe,
      nativeSelect: nativeSelectRecipe,
      textarea: selectTextarea,
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
            50: { value: "#f8f8f8" },
            100: { value: "#ffffff" },
            200: { value: "#DDDDDD" },
            300: { value: "#CCCCCC" },
            400: { value: "#B9B9B9" },
            500: { value: "#777777" },
            600: { value: "#666666" },
            700: { value: "#555555" },
            800: { value: "#424242" },
            900: { value: "#393939" },
            1000: { value: "#292929" },
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
          50: { value: "#f9f9f9" },
          100: { value: "#f1f1f1" },
          200: { value: "#e6e6e6" },
          300: { value: "#d0d0d0" },
          400: { value: "#aeaeae" },
          500: { value: "#808080" },
          600: { value: "#555555" },
          700: { value: "#373737" },
          800: { value: "#202020" },
          900: { value: "#191919" },
          1000: { value: "#111111" },
        },
      },
    },
    semanticTokens: {
      fonts: {
        customHeading: { value: "{fonts.heading}" },
      },
      colors: {
        brand: {
          solid: {
            value: {
              _light: "{colors.brand.purple.900}",
              _dark: "{colors.brand.purple.500}",
            },
          },
          contrast: { value: "{colors.brand.purple.900}" },
          fg: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.white}",
            },
          },
          muted: {
            value: {
              _light: "{colors.brand.gray.300}",
              _dark: "{colors.brand.gray.500}",
            },
          },
          subtle: { value: "{colors.brand.gold.500}" },
          emphasized: { value: "{colors.brand.gold.500}" },
          focusRing: { value: "{colors.brand.purple.900}" },
        },
        bg: {
          root: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.400}" },
          },
          pill: {
            value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
          },
          card: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.1000}" },
          },
        },
        border: {
          card: {
            value: {
              _light: "{colors.brand.gray.400}",
              _dark: "{colors.brand.gray.700}",
            },
          },
          listPreview: {
            value: {
              _light: "{colors.whiteAlpha.600}",
              _dark: "{colors.whiteAlpha.600}",
            },
          },
          badge: {
            value: {
              _light: "{colors.brand.gray.300}",
              _dark: "{colors.gray.600}",
            },
          },
          tag: {
            value: {
              _light: "{colors.brand.gray.400}",
              _dark: "{colors.gray.600}",
            },
          },
          button: {
            value: {
              _light: "{colors.brand.gray.500}",
              _dark: "{colors.gray.300}",
            },
          },
        },
        layoutSecondary: {
          bg: {
            value: {
              _light: "{colors.brand.purple.500}",
              _dark: "{colors.brand.gray.800}",
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
              _dark: "{colors.brand.gray.1000}",
            },
          },
          text: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.white}",
            },
          },
        },
        layoutTertiary: {
          bg: {
            value: {
              _light: "{colors.brand.gray.100}",
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
        layoutQuaternary: {
          bg: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.gray.800}",
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
              _light: "{colors.gray.300}",
              _dark: "{colors.gray.700}",
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
              _light: "{colors.brand.gray.800}",
              _dark: "{colors.brand.gray.300}",
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
              _light: "{colors.brand.gray.300}",
              _dark: "{colors.brand.gray.500}",
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
        buttonTertiary: {
          bg: {
            value: {
              _light: "colors.brand.purple.900",
              _dark: "colors.brand.purple.900",
            },
          },
          text: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.white}",
            },
          },
          border: {
            value: {
              _light: "{colors.brand.purple.900}",
              _dark: "{colors.brand.purple.900}",
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
          hoverBorder: {
            value: {
              _light: "{colors.brand.gold.500}",
              _dark: "{colors.brand.gold.500}",
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
