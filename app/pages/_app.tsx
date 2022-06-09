import type { AppProps } from "next/app";
import { createTheme, NextUIProvider, Theme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Nav from "../Nav/Nav";

const fonts = {
  sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const sharedTheme: Theme = {
  theme: {
    fonts,
  },
};

export const lightTheme = createTheme({
  ...sharedTheme,
  type: "light",
});

export const darkTheme = createTheme({
  ...sharedTheme,
  type: "dark",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextThemesProvider
        defaultTheme="dark"
        enableSystem={false}
        attribute="class"
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
