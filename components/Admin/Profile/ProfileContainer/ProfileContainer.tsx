import styles from "./ProfileContainer.module.scss";
import { Picture } from "../Picture/Picture";
import { Position } from "../Position/Position";
import { Spacer } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export const ProfileContainer = ({ user }: any) => {
  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.flexContainer}>
        <Picture user={user} />
        <Spacer />
        <Position user={user} />
      </div>
    </div>
  );
};
