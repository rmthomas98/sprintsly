import styles from "./NavBar.module.scss";
import { Input, User, Dropdown, useTheme, Text } from "@nextui-org/react";
import {
  BiSearch,
  BiLogOut,
  BiSun,
  BiMoon,
  BiHelpCircle,
  BiMessageRounded,
  BiCog,
  BiUser,
  BiBell,
} from "react-icons/bi";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { userInfo } from "os";

interface SessionData {
  name: any;
  email: any;
  image: any;
  username: any;
}

export const NavBar = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  const [sessionData, setSessionData] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const session = await getSession();
      setSessionData(session);
    };
    getData();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.querySelector("body")?.classList.add("my-dark-app");
    } else {
      document.querySelector("body")?.classList.remove("my-dark-app");
    }
  }, [isDark]);

  const getName = (): string => {
    const name = sessionData.user.name[0];
    if (name.includes(" ")) {
      const firstInitial = name.split(" ")[0].charAt(0);
      const lastInitial = name.split(" ")[1].charAt(0);
      return `${firstInitial}${lastInitial}`;
    } else {
      return name.chartAt(0);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Input
          placeholder="Search..."
          size="md"
          fullWidth
          contentLeft={<BiSearch />}
          css={{ maxWidth: 300 }}
        />
        <div className={styles.rightContainer}>
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
              <User
                as="button"
                text={sessionData && getName()}
                name={sessionData?.user.name[0]}
                description={`@${sessionData?.username}`}
                src={sessionData?.user.image && sessionData.user.image}
                squared
                bordered
                color="gradient"
                css={{ fontWeight: 600 }}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              // disabledKeys={["team-settings"]}
              variant="shadow"
              aria-label="Static Actions"
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text color="inherit">Signed in as</Text>
                <Text size={14} color="inherit">
                  {sessionData?.user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item withDivider key="my-profile" icon={<BiUser />}>
                My profile
              </Dropdown.Item>
              <Dropdown.Item key="my-settings" icon={<BiCog />}>
                My settings
              </Dropdown.Item>
              <Dropdown.Item
                withDivider
                key="theme"
                icon={isDark ? <BiSun /> : <BiMoon />}
              >
                <Text
                  color="inherit"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? "Light mode" : "Dark mode"}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item
                withDivider
                key="feedback"
                icon={<BiMessageRounded />}
              >
                Feedback
              </Dropdown.Item>
              <Dropdown.Item key="help" icon={<BiHelpCircle />}>
                Customer support
              </Dropdown.Item>
              <Dropdown.Item
                withDivider
                key="logout"
                color="error"
                icon={<BiLogOut />}
              >
                <Text
                  color="inherit"
                  onClick={() =>
                    signOut({ callbackUrl: "http://localhost:3000/login" })
                  }
                >
                  Logout
                </Text>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
