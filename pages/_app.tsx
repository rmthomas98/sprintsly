import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "../components/Nav/Nav";
import { createTheme, NextUIProvider, globalCss } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const globalStyles = globalCss({
  html: {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  },
  ".nextui-collapse-title": {
    fontSize: 16,
    fontWeight: "$semibold",
  },
});

const fonts = {
  sans: "Gilroy, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

export const lightTheme = createTheme({
  type: "light",
  theme: {
    fonts: fonts,
    // colors: {
    //   primaryLight: "#FFEBCC",
    //   primaryLightHover: "#FFD199", // commonly used on hover state
    //   primaryLightActive: "#FFB166", // commonly used on pressed state
    //   primaryLightContrast: "#FF5F00", // commonly used for text inside the component
    //   primary: "#FF5F00",
    //   primaryBorder: "#FF923F",
    //   primaryBorderHover: "#FF5F00",
    //   primarySolidHover: "#DB4400",
    //   primarySolidContrast: "$white", // commonly used for text inside the component
    //   primaryShadow: "#FF923F",
    // },
  },
});

export const darkTheme = createTheme({
  type: "dark",
  theme: {
    fonts: fonts,
    // colors: {
    //   primaryLight: "#7A0F00",
    //   primaryLightHover: "#931B00", // commonly used on hover state
    //   primaryLightActive: "#B72D00", // commonly used on pressed state
    //   primaryLightContrast: "#FF5F00", // commonly used for text inside the component
    //   primary: "#FF5F00",
    //   primaryBorder: "#DB4400",
    //   primaryBorderHover: "#FF5F00",
    //   primarySolidHover: "#FF923F",
    //   primarySolidContrast: "$white", // commonly used for text inside the component
    //   primaryShadow: "#DB4400",
    // },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  globalStyles();
  return (
    <>
      <NextThemesProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
        value={{ light: lightTheme.className, dark: darkTheme.className }}
      >
        <NextUIProvider>
          <Nav />
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
};

export default MyApp;
