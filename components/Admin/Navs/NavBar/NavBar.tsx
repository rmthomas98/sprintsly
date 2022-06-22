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
    <Dropdown>
      <Dropdown.Trigger>
        <User
          as="button"
          name="rmthomas98"
          text="RT"
          bordered
          color="gradient"
          squared
          size="sm"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu aria-label="Static Actions">
        <Dropdown.Item key="my-account">My account</Dropdown.Item>
        <Dropdown.Item key="settings">Settings</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
