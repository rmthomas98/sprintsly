import styles from "./Nav.module.scss";
import Image from "next/image";
import blackLogo from "/public/images/black-logo.svg";
import whiteLogo from "/public/images/white-logo.svg";
import {
  Text,
  Switch,
  useTheme,
  Link,
  Spacer,
  Button,
  Modal,
  Checkbox,
  Input,
  Row,
  Loading,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";
import NextLink from "next/link";
import { useState } from "react";
import { BiLockAlt, BiEnvelope } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any): Promise<void> => {
    setIsLoading(true);
    console.log(data);

    const response = await axios.post("/api/login", data);
    if (response.data.status === "success") {
      router.push("/admin");
    } else {
      setIsLoading(false);
      console.log("error");
    }
  };

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ background: isDark ? "#000" : "#fff" }}
      >
        <div className={styles.container}>
          <NextLink href="/">
            <a>
              <div className={styles.titleContainer}>
                <Image
                  src={isDark ? whiteLogo : blackLogo}
                  height={35}
                  width={35}
                  alt="pryzma logo"
                />
                <Text h4 weight="medium" className={styles.title}>
                  Pryzma
                </Text>
              </div>
            </a>
          </NextLink>
          <div className={styles.linkContainer}>
            <Switch
              css={{ position: "relative", bottom: 2 }}
              size="sm"
              color="primary"
              checked={isDark}
              iconOn={<IoMoon />}
              iconOff={<IoSunny />}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
            <Spacer />
            <NextLink href="/">
              <Link color="text" css={{ fontSize: 13, fontWeight: 500 }}>
                Pricing
              </Link>
            </NextLink>
            <Spacer />
            <NextLink href="/">
              <Link color="text" css={{ fontSize: 13, fontWeight: 500 }}>
                Support
              </Link>
            </NextLink>
            <Spacer />
            <Link
              color="text"
              css={{ fontSize: 13, fontWeight: 500 }}
              onClick={() => setVisible(true)}
            >
              Log in
            </Link>
            <Spacer />
            <NextLink href="/">
              <Button
                size="sm"
                css={{ fontSize: 13, fontWeight: 500 }}
                auto
                flat
                color="primary"
              >
                Sign up
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Text id="modal-title" h4 weight="medium">
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
              type="email"
              aria-label="Email"
              placeholder="Email"
              contentLeft={<BiEnvelope />}
              {...register("email", { required: true })}
            />
            <Input
              clearable
              bordered
              aria-label="Password"
              fullWidth
              color="primary"
              size="lg"
              type="password"
              placeholder="Password"
              contentLeft={<BiLockAlt />}
              {...register("password", { required: true })}
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <NextLink href="/forgot-password">
                <Link
                  color="text"
                  css={{ fontSize: 14, letterSpacing: "$tight" }}
                >
                  Forgot password
                </Link>
              </NextLink>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={() => setVisible(false)}>
              Close
            </Button>
            <Button
              css={{ width: 80 }}
              auto
              color="primary"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <Loading size="sm" color="primary" /> : "Sign in"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Nav;
