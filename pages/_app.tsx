import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "../components/Nav/Nav";
import { createTheme, NextUIProvider, globalCss } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

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
  },
});

export const darkTheme = createTheme({
  type: "dark",
  theme: {
    fonts: fonts,
  },
});

const MyApp = ({ Component, pageProps }: AppProps, session: any) => {
  globalStyles();
  const router = useRouter();

  return (
    <>
      <SessionProvider session={session}>
        <NextThemesProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          value={{ light: lightTheme.className, dark: darkTheme.className }}
        >
          <NextUIProvider>
            {router.pathname.startsWith("/admin") ? (
              <>
                <Component {...pageProps} />
              </>
            ) : (
              <>
                <Nav />
                <Component {...pageProps} />
              </>
            )}
          </NextUIProvider>
        </NextThemesProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
