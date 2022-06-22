import styles from "./NavBar.module.scss";
import {
  Input,
  User,
  Dropdown,
  Tooltip,
  Text,
  Button,
} from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

export const NavBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Input
          aria-label="search"
          clearable
          fullWidth
          bordered
          contentClickable
          contentLeft={<BiSearch />}
          css={{ maxWidth: 350 }}
          placeholder="Search..."
          animated={false}
        />
        <Dropdown trigger="press" placement="bottom-right">
          <Dropdown.Trigger>
            <User
              as="button"
              name="rmthomas98"
              text="RT"
              bordered
              color="gradient"
              squared
              size="sm"
              css={{ fontWeight: 600 }}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item key="something">hello</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
