import styles from "./ProfileContainer.module.scss";
import { Picture } from "../Picture";
import { Position } from "../Position";
import { Spacer } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { Name } from "../Name";
import { Email } from "../Email";
import { Password } from "../Password";
import { Username } from "../Username";
import { Text } from "@nextui-org/react";

export const ProfileContainer = ({ user }: any) => {
  return (
    <div className={styles.container}>
      <Toaster />
      <Text h3 className={styles.fade}>
        Your profile
      </Text>
      <Spacer y={0.4} />
      <div className={styles.flexContainer}>
        <Picture user={user} />
        <Spacer />
        <Position user={user} />
      </div>
      <Spacer />
      <div className={styles.flexContainer}>
        <Name user={user} />
        <Spacer />
        <Email user={user} />
      </div>
      <Spacer />
      <div className={styles.flexContainer}>
        <Username user={user} />
        <Spacer />
        <Password user={user} />
      </div>
    </div>
  );
};
