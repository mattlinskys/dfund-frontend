import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#F8F9FD",
      },
    },
  },
  colors: {
    brand: {
      50: "#e6f1ff",
      100: "#a3c9ff",
      200: "#7aadff",
      300: "#528eff",
      400: "#296dff",
      500: "#0049ff",
      600: "#0036d9",
      700: "#0027b3",
      800: "#001a8c",
      900: "#000f66",
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

export default theme;

// Dark mode
// 0: "#11172c"
// 1: "#0f1d45"
// 2: "#0e245b"
// 3: "#0b2c7e"
// 4: "#0736ad"
// 5: "#0341dc"
// 6: "#2764e8"
// 7: "#4f88f3"
// 8: "#77a8f8"
// 9: "#a0c5fa"
