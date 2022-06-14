import styles from "./PricingPlans.module.scss";
import {
  Card,
  Text,
  Switch,
  Checkbox,
  Row,
  Divider,
  Spacer,
  Button,
} from "@nextui-org/react";
import { BiCheck, BiMeteor } from "react-icons/bi";
import { useState } from "react";

export const PricingPlans = () => {
  const [plans, setPlans] = useState<string>("personal");

  const backgroundFill = {
    background: "$primary",
    color: "#fff",
    width: 100,
  };

  const noFill = {
    width: 100,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Text h2 className={styles.header}>
          Choose the right plan for{" "}
          <Text
            span
            weight="bold"
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
          >
            you
          </Text>
        </Text>
        <Row justify="center" align="center" css={{ mb: "$16" }}>
          <Button.Group bordered color="primary" size="md">
            <Button
              onClick={() => setPlans("personal")}
              css={plans === "personal" ? backgroundFill : noFill}
            >
              Personal
            </Button>
            <Button
              onClick={() => setPlans("teams")}
              css={plans === "teams" ? backgroundFill : noFill}
            >
              Teams
            </Button>
          </Button.Group>
        </Row>
        {/* <Text
          className={styles.description}
          size={14}
          weight="medium"
          css={{ textAlign: "center", marginBottom: 30, maxWidth: 600 }}
        >
          We want to make it as simple as we can for you while providing an easy
          to navigate user experience. We don&#39;t want to give you the hassle
          of going through a number of different plans so we decided to only
          offer a free and paid plan with clear differences.
        </Text> */}
        <div className={styles.flexContainer}>
          <Card isHoverable css={{ padding: "$8" }}>
            <Row>
              <Text
                weight="semibold"
                size={14}
                css={{
                  color: "$accents6",
                  letterSpacing: "$wide",
                  // padding: "$2",
                  px: "$6",
                  py: "$0",
                  borderRadius: "$xs",
                  background: "$accents1",
                  width: "fit-content",
                }}
              >
                Free
              </Text>
            </Row>
            <Row css={{ my: "$2" }}>
              <Text h2>
                $0.00
                <Text span small>
                  {" "}
                  / month
                </Text>
              </Text>
            </Row>
            <Divider css={{ mb: "$6" }} />
            <Row align="center">
              <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
              <Text
                weight="bold"
                color="#787F85"
                size={14}
                css={{ letterSpacing: "$wide" }}
              >
                Up to 5 projects
              </Text>
            </Row>
            <Row align="center">
              <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
              <Text
                weight="bold"
                color="#787F85"
                size={14}
                css={{ letterSpacing: "$wide" }}
              >
                Create tasks/todo
              </Text>
            </Row>
            <Row align="center">
              <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
              <Text
                weight="bold"
                color="#787F85"
                size={14}
                css={{ letterSpacing: "$wide" }}
              >
                Unlimited cloud storage
              </Text>
            </Row>
            <Row align="center">
              <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
              <Text
                weight="bold"
                color="#787F85"
                size={14}
                css={{ letterSpacing: "$wide" }}
              >
                15mb max file size
              </Text>
            </Row>
          </Card>
          <Spacer />
          <Card isHoverable css={{ padding: "$8" }}>
            <Text>Free</Text>
          </Card>
        </div>
      </div>
    </div>
  );
};
