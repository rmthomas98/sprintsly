import styles from "./SignupForm.module.scss";
import { Radio, Spacer, Text } from "@nextui-org/react";

export const SignupForm = () => {
  return (
    <div className={styles.container}>
      <Radio.Group
        size="sm"
        orientation="horizontal"
        label="How will you use Sprintsly?"
      >
        <Radio value="personal">Personal</Radio>
        <Radio value="teams">Teams</Radio>
      </Radio.Group>
      <Spacer />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        label="How will you use Sprintsly?"
      >
        <Radio value="personal">Personal</Radio>
        <Radio value="teams">Teams</Radio>
      </Radio.Group>
    </div>
  );
};
