import styles from "./Nav.module.scss";
import { useTheme as useNextTheme } from "next-themes";
import {
  Input,
  Row,
  useTheme,
  Link,
  Spacer,
  Button,
  Modal,
  Text,
  Checkbox,
} from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiLockAlt, BiEnvelope } from "react-icons/bi";
import {
  BsTwitter,
  BsFillSunFill,
  BsFillMoonFill,
  BsFacebook,
  BsLinkedin,
} from "react-icons/bs";
import { useRouter } from "next/router";

export const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const router = useRouter();

  const [isActive, setIsActive] = useState<boolean>(false);

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
            {/* <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 14, fontWeight: "$semibold" }}
              >
                Support
              </Link>
            </NextLink> */}
          </div>
          <div className={styles.linkContainer}>
            {/* <Switch
            css={{ position: "relative", bottom: 3 }}
            color="secondary"
            checked={isDark}
            iconOn={<IoMoon />}
            iconOff={<IoSunny />}
            size="xs"
            onChange={(e) =>
              e.target.checked ? setTheme("dark") : setTheme("light")
            }
          />
          <Spacer /> */}
            <Link href="/" css={{ color: "$accents7" }}>
              <BsFacebook size={18} style={{ cursor: "pointer" }} />
            </Link>
            <Spacer x={0.4} />
            <Link href="/" css={{ color: "$accents7" }}>
              <BsLinkedin size={18} style={{ cursor: "pointer" }} />
            </Link>
            <Spacer x={0.4} />
            <Link href="/" css={{ color: "$accents7" }}>
              <BsTwitter size={18} style={{ cursor: "pointer" }} />
            </Link>
            <Spacer x={0.4} />
            <Link color="text" css={{ color: "$accents7" }}>
              {isDark ? (
                <BsFillMoonFill
                  onClick={() => setTheme("light")}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <BsFillSunFill
                  size={18}
                  onClick={() => setTheme("dark")}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Link>
            <Spacer />
            <Link
              onClick={() => setIsActive(true)}
              color="text"
              css={{ fontSize: 14, fontWeight: "$semibold" }}
            >
              Log in
            </Link>
            <Spacer />
            <NextLink href="/pricing">
              <Button color="primary" flat auto size="sm">
                Sign up
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={isActive}
        onClose={() => setIsActive(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={20} weight="medium">
            Log in to your account
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            type="email"
            contentLeft={<BiEnvelope fill="currentColor" />}
          />
          <Input.Password
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            type="password"
            contentLeft={<BiLockAlt fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setIsActive(false)}>
            Close
          </Button>
          <Button auto>Sign in</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
