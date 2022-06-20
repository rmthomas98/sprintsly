import styles from "./Nav.module.scss";
import { useTheme as useNextTheme } from "next-themes";
import {
  useTheme,
  Link,
  Spacer,
  Button,
  Text,
  Tooltip,
} from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import {
  BsTwitter,
  BsFillSunFill,
  BsFillMoonFill,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";
import { useRouter } from "next/router";

export const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const router = useRouter();

  useEffect(() => {
    if (isDark) {
      document.querySelector("body")?.classList.add("my-dark-app");
    } else {
      document.querySelector("body")?.classList.remove("my-dark-app");
    }
  }, [isDark]);

  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          background: isDark ? "#00000042" : "#ffffff42",
          borderBottom: isDark ? "1px solid #26292b" : "1px solid #ecedee",
        }}
      >
        <div className={styles.container}>
          <NextLink href="/">
            <a className={styles.logoContainer}>
              <Image
                src="/images/transparent-logo.png"
                height={45}
                width={45}
                alt="sprintsly logo"
              />
              <Spacer x={0.3} />
              <Text weight="medium" size={22} css={{ fontFamily: "comfortaa" }}>
                Sprintsly
              </Text>
            </a>
          </NextLink>
          <div className={styles.centerContainer}>
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 14, fontWeight: "$semibold" }}
              >
                Products
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 14, fontWeight: "$semibold" }}
              >
                Plans
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/pricing">
              <Link
                color={
                  router.pathname.endsWith("/pricing") ? "primary" : "text"
                }
                css={{
                  fontSize: 14,
                  fontWeight: "$semibold",
                }}
              >
                Pricing
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 14, fontWeight: "$semibold" }}
              >
                About
              </Link>
            </NextLink>
          </div>
          <div className={styles.linkContainer}>
            <Tooltip
              offset={20}
              css={{ zIndex: 9999, pointerEvents: "none" }}
              content={"LinkedIn"}
              placement="bottom"
              color="invert"
              shadow
            >
              <Link href="/" css={{ color: "$accents7" }}>
                <BsLinkedin size={18} style={{ cursor: "pointer" }} />
              </Link>
            </Tooltip>
            <Spacer x={0.4} />
            <Tooltip
              offset={20}
              css={{ zIndex: 9999, pointerEvents: "none" }}
              content={"Youtube"}
              placement="bottom"
              color="invert"
              shadow
            >
              <Link href="/" css={{ color: "$accents7" }}>
                <BsYoutube size={18} style={{ cursor: "pointer" }} />
              </Link>
            </Tooltip>
            <Spacer x={0.4} />
            <Tooltip
              offset={20}
              css={{ zIndex: 9999, pointerEvents: "none" }}
              content={"Twitter"}
              placement="bottom"
              color="invert"
              shadow
            >
              <Link href="/" css={{ color: "$accents7" }}>
                <BsTwitter size={18} style={{ cursor: "pointer" }} />
              </Link>
            </Tooltip>
            <Spacer x={0.4} />
            <Tooltip
              offset={20}
              css={{ zIndex: 9999, pointerEvents: "none" }}
              content={isDark ? "Light mode" : "Dark mode"}
              placement="bottom"
              color="invert"
              shadow
            >
              <Link color="text" css={{ color: "$accents7" }}>
                {isDark ? (
                  <BsFillSunFill
                    onClick={() => setTheme("light")}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <BsFillMoonFill
                    size={18}
                    onClick={() => setTheme("dark")}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Link>
            </Tooltip>
            <Spacer />
            <NextLink href="/login">
              <Link
                color="text"
                css={{ fontSize: 14, fontWeight: "$semibold" }}
              >
                Log in
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/signup">
              <Button color="primary" flat auto size="sm">
                Sign up
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
};
