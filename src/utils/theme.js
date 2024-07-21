// theme.js

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#0088cc",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#9A4D49",
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#F5F5F5",
      success: "#4ABC04",
      info: "#0095FF",
      orange: "#FF8A00",
      error: "#FF0000",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "10px",

        // Set your desired border radius here
      },
      _hover: {
        background: "inherit",
        boxShadow: "none",
        opacity: 1,
      },
    },
  },
  // You can also extend other parts of the theme like fonts, styles, etc.
});

export default customTheme;
