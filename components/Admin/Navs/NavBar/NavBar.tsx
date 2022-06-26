import styles from "./NavBar.module.scss";
import {
  Input,
  User,
  Dropdown,
  useTheme,
  Text,
  Divider,
} from "@nextui-org/react";
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
  const [initials, setInitials] = useState<string>();

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

  useEffect(() => {
    if (!data) return;
    const name = data.name;
    if (name.includes(" ")) {
      const firstInitial = name.split(" ")[0].charAt(0);
      const lastInitial = name.split(" ")[1].charAt(0);
      setInitials(`${firstInitial}${lastInitial}`);
    } else {
      setInitials(name.charAt(0));
    }
  }, [data]);

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
      case "logout":
        signOut({ callbackUrl: "http://localhost:3000/login" });
        break;
    }
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        background: isDark ? "#00000042" : "#ffffff42",
        paddingBottom: isDark ? 12 : 0,
      }}
    >
      <div className={styles.container}>
        <Input
          placeholder="Search..."
          size="md"
          fullWidth
          contentLeft={<BiSearch />}
          css={{ maxWidth: 300 }}
          type="search"
          clearable
          aria-label="search"
          id="search"
        />
        <div className={styles.rightContainer}>
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
              <User
                as="button"
                id="user"
                name={data && data.name}
                text={initials}
                description={data && `@${data.username}`}
                src={data?.image && data.image}
                squared
                pointer
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
                  {data && data.email}
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
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {!isDark && <Divider css={{ mt: "$6" }} />}
    </div>
  );
};
