import styles from "./PlanSelect.module.scss";
import {
  Switch,
  Radio,
  Spacer,
  Card,
  Divider,
  Text,
  Button,
  Link,
} from "@nextui-org/react";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { BiRightArrowAlt } from "react-icons/bi";
import { useState } from "react";
import NextLink from "next/link";

interface Props {
  setAccountInfo: any;
  setStep: any;
}

export const PlanSelect = (props: Props) => {
  const [plan, setPlan] = useState<string>("personal");
  const [tier, setTier] = useState<string>("free");

  const handleSubmit = () => {
    props.setAccountInfo({ plan: plan, tier: tier });
    props.setStep(2);
  };

  return (
    <div className={`${styles.container} ${styles.fade}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text css={{ mr: "$5" }} weight="medium" size={16}>
          Personal
        </Text>
        <Switch
          iconOn={<BsFillPeopleFill />}
          iconOff={<BsFillPersonFill />}
          size="md"
          shadow
          color="primary"
          css={{ position: "relative", bottom: 2 }}
          checked={plan === "teams"}
          onChange={(e) =>
            e.target.checked ? setPlan("teams") : setPlan("personal")
          }
        />
        <Text css={{ ml: "$5" }} size={16} weight="medium">
          Teams
        </Text>
      </div>
      <Spacer />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Radio.Group
          css={{ textAlign: "center", alignItems: "center" }}
          size="sm"
          orientation="horizontal"
          label="Select your plan"
          onChange={setTier}
          value={tier}
        >
          <Radio value="free">Free</Radio>
          <Radio value="pro">Pro</Radio>
        </Radio.Group>
      </div>
      <Spacer />
      <Card css={{ px: "$8", py: "$4" }} isHoverable>
        <Card.Header css={{ padding: "$4" }}>
          <Text h3>Your selected plan</Text>
        </Card.Header>
        <Divider />
        <Card.Body css={{ padding: "$4", py: "$8" }}>
          <div className={styles.cardFlexContainer}>
            <div>
              <Text h4 css={{ textTransform: "capitalize" }}>
                {plan}
              </Text>

              <Text
                weight="semibold"
                size={14}
                css={{ textTransform: "capitalize", color: "$accents8" }}
              >
                sprintsly {tier}
              </Text>
            </div>

            <Text h2>
              {plan === "teams" && tier === "pro"
                ? "$7.00"
                : plan === "personal" && tier === "pro"
                ? "$5.00"
                : "$0.00"}
              <Text span small>
                {" "}
                {plan === "teams" && tier === "pro" ? "/user/month" : "/month"}
              </Text>
            </Text>
          </div>
        </Card.Body>
        <Card.Footer css={{ padding: "$4" }}>
          <Button
            iconRight={<BiRightArrowAlt size={18} />}
            color="primary"
            size="sm"
            css={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Card.Footer>
      </Card>
      <Spacer />
      <NextLink href="/pricing">
        <Link
          css={{
            fontSize: 13,
            fontWeight: "$medium",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          color="text"
        >
          Compare all plans
          <BiRightArrowAlt
            style={{ marginLeft: 6, position: "relative", top: 1 }}
          />
        </Link>
      </NextLink>
    </div>
  );
};
