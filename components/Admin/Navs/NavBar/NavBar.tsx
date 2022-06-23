import styles from "./NavBar.module.scss";
import { Input, User, Dropdown, useTheme, Text } from "@nextui-org/react";
import {
  BiSearch,
  BiLogOut,
  BiSun,
  BiMoon,
  BiHelpCircle,
  BiMessageRounded,
  BiPackage,
  BiUser,
  BiBell,
} from "react-icons/bi";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import axios from "axios";

export const NavBar = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  const router = useRouter();

  const [data, setData] = useState<any>();
  const [disabled, setDisabled] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      const session = await getSession();
      const response = await axios.post("/api/admin/get-user", {
        id: session?.id,
      });
      setData(response.data);
      if (response.data.role !== "SUPERADMIN") setDisabled("my-subscription");
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
    const name = data.name;
    if (name.includes(" ")) {
      const firstInitial = name.split(" ")[0].charAt(0);
      const lastInitial = name.split(" ")[1].charAt(0);
      return `${firstInitial}${lastInitial}`;
    } else {
      return name.chartAt(0);
    }
  };

  const handleDropDownAction = (key: any) => {
    switch (key) {
      case "my-profile":
        router.push("/admin/my-profile");
        break;
      case "my-subscription":
        router.push("/admin/my-subscription");
        break;
      case "theme":
        isDark ? setTheme("light") : setTheme("dark");
        break;
      case "feedback":
        router.push("/admin/feedback");
        break;
      case "support":
        router.push("/admin/support");
        break;
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
                text={data && getName()}
                name={data && data.name}
                description="@rmthoams"
                src=""
                squared
                bordered
                color="gradient"
                css={{ fontWeight: 600 }}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              onAction={handleDropDownAction}
              variant="shadow"
              aria-label="dropdown actions"
              disabledKeys={[disabled ? disabled : ""]}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text color="inherit">Signed in as</Text>
                <Text size={14} color="inherit">
                  rmthomas@aonecarpet.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item withDivider key="my-profile" icon={<BiUser />}>
                My profile
              </Dropdown.Item>
              <Dropdown.Item key="my-subscription" icon={<BiPackage />}>
                My subscription
              </Dropdown.Item>
              <Dropdown.Item
                withDivider
                key="theme"
                icon={isDark ? <BiSun /> : <BiMoon />}
              >
                {isDark ? "Light mode" : "Dark mode"}
              </Dropdown.Item>
              <Dropdown.Item
                withDivider
                key="feedback"
                icon={<BiMessageRounded />}
              >
                Feedback
              </Dropdown.Item>
              <Dropdown.Item key="support" icon={<BiHelpCircle />}>
                Support
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
