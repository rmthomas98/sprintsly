import styles from "./SignupContainer.module.scss";
import { SignupForm } from "../SignupForm/SignupForm";
import { PlanSelect } from "../PlanSelect/PlanSelect";
import { Spacer, Text } from "@nextui-org/react";
import { useState } from "react";

export const SignupContainer = () => {
  const [step, setStep] = useState<number>(1);
  const [accountInfo, setAccountInfo] = useState<any>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Text h2 className={`${styles.header} ${styles.fade}`}>
          Get started with{" "}
          <Text
            span
            weight="bold"
            css={{
              textGradient: "45deg, $pink700 , $blue600 100%",
            }}
          >
            Sprintsly
          </Text>
        </Text>
        <Spacer />
        {step === 1 && (
          <PlanSelect
            setAccountInfo={setAccountInfo}
            accountInfo={accountInfo}
            setStep={setStep}
            step={step}
          />
        )}
        {step === 2 && (
          <SignupForm
            setStep={setStep}
            accountInfo={accountInfo}
            setAccountInfo={setAccountInfo}
          />
        )}
      </div>
    </div>
  );
};
