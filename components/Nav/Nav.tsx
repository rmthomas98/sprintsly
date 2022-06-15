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
import { IoSunny, IoMoon } from "react-icons/io5";
import NextLink from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BiLockAlt, BiEnvelope } from "react-icons/bi";

export const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <NextLink href="/">
            <Image
              src="/images/transparent-logo.png"
              height={45}
              width={45}
              style={{ filter: "hue-rotate(200deg)", cursor: "pointer" }}
            />
          </NextLink>
          <div className={styles.centerContainer}>
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 13, fontWeight: "$semibold" }}
              >
                Products
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 13, fontWeight: "$semibold" }}
              >
                Plans
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 13, fontWeight: "$semibold" }}
              >
                Pricing
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 13, fontWeight: "$semibold" }}
              >
                Support
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link
                color="text"
                css={{ fontSize: 13, fontWeight: "$semibold" }}
              >
                About
              </Link>
            </NextLink>
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
            <Link color="text">
              {isDark ? (
                <IoMoon
                  onClick={() => setTheme("light")}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <IoSunny
                  onClick={() => setTheme("dark")}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Link>
            <Spacer />
            <Link
              onClick={() => setIsActive(true)}
              color="text"
              css={{ fontSize: 13, fontWeight: "$semibold" }}
            >
              Log in
            </Link>
            <Spacer />
            <NextLink href="/pricing">
              <Button color="gradient" auto size="sm">
                Sign up
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
      <Modal
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
