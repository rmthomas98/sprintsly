import styles from "./SignupForm.module.scss";
import { Input, Spacer, Card, Text, Button } from "@nextui-org/react";
import {
  BiLockAlt,
  BiEnvelope,
  BiUser,
  BiGroup,
  BiRightArrowAlt,
  BiLeftArrowAlt,
} from "react-icons/bi";

interface Props {
  accountInfo: any;
  setAccountInfo: any;
  setStep: any;
}

export const SignupForm = (props: Props) => {
  return (
    <div className={`${styles.container} ${styles.fade}`}>
      <Card css={{ px: "$8", py: "$4" }} isHoverable>
        {/* <Card.Header css={{ padding: "$4" }}>
          <Text h3>Your selected plan</Text>
        </Card.Header>
        <Divider /> */}
        <Card.Body css={{ padding: "$4", py: "$8" }}>
          <div className={styles.cardFlexContainer}>
            <div>
              <Text h4 css={{ textTransform: "capitalize" }}>
                {props.accountInfo.plan}
              </Text>

              <Text
                weight="semibold"
                size={14}
                css={{ textTransform: "capitalize", color: "$accents8" }}
              >
                sprintsly {props.accountInfo.tier}
              </Text>
            </div>

            <Text h2>
              {props.accountInfo.plan === "teams" &&
              props.accountInfo.tier === "pro"
                ? "$7.00"
                : props.accountInfo.plan === "personal" &&
                  props.accountInfo.tier === "pro"
                ? "$5.00"
                : "$0.00"}
              <Text span small>
                {" "}
                {props.accountInfo.plan === "teams" &&
                props.accountInfo.tier === "pro"
                  ? "/user/month"
                  : "/month"}
              </Text>
            </Text>
          </div>
        </Card.Body>
        <Card.Footer css={{ padding: "$4" }}>
          <Button
            icon={<BiLeftArrowAlt size={18} />}
            color="warning"
            flat
            size="sm"
            css={{ width: "100%" }}
            onClick={() => props.setStep(1)}
          >
            Change plan
          </Button>
        </Card.Footer>
      </Card>
      <Spacer />
      <Text h5>Account information</Text>
      <Spacer />
      <form>
        <div className={styles.nameContainer}>
          <Input
            placeholder="First name"
            fullWidth
            bordered
            size="md"
            type="text"
            aria-label="First name"
          />
          <Spacer />
          <Input
            placeholder="Last name"
            fullWidth
            bordered
            size="md"
            type="text"
            aria-label="Last name"
            // status="error"
          />
        </div>
        <Spacer />
        <Input
          placeholder="Email"
          fullWidth
          bordered
          size="md"
          type="email"
          aria-label="Email"
          contentLeft={<BiEnvelope />}
        />
        <Spacer />
        <Input
          placeholder="Username"
          fullWidth
          bordered
          size="md"
          type="text"
          aria-label="Username"
          contentLeft={<BiUser />}
        />
        <Spacer />
        <Input
          placeholder="Team name"
          fullWidth
          bordered
          size="md"
          type="text"
          aria-label="Team name"
          contentLeft={<BiGroup />}
        />
        <Spacer />
        <Input.Password
          placeholder="Password"
          fullWidth
          bordered
          size="md"
          aria-label="Password"
          contentLeft={<BiLockAlt />}
        />
        <Spacer />
        <Button
          css={{ width: "100%" }}
          iconRight={
            props.accountInfo.tier === "pro" && <BiRightArrowAlt size={18} />
          }
        >
          {props.accountInfo.tier === "pro"
            ? "Continue to payment"
            : "Create account"}
        </Button>
      </form>
    </div>
  );
};
