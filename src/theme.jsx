import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";
import "@fontsource/nunito-sans";

const theme = extendTheme({
  fonts: {
    heading: `'Nunito Sans', sans-serif`,
    body: `'Poppins', sans-serif;`,
  },
});

export default theme;
