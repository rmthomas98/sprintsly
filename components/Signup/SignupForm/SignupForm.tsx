import styles from "./SignupForm.module.scss";
import {
  Button,
  Input,
  Radio,
  Spacer,
  Switch,
  Text,
  Card,
} from "@nextui-org/react";
import { BiLockAlt, BiEnvelope, BiUser, BiGroup } from "react-icons/bi";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { useState } from "react";

export const SignupForm = () => {
  const [plan, setPlan] = useState<string>("personal");

  return (
    <div className={styles.container}>
      <form>
        {/* <div
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
            onChange={(e) =>
              e.target.checked ? setPlan("teams") : setPlan("personal")
            }
          />
          <Text css={{ ml: "$5" }} size={16} weight="medium">
            Teams
          </Text>
        </div> */}
        {/* <Radio.Group
          size="xs"
          orientation="horizontal"
          label="How will you use Sprintsly?"
        >
          <Radio value="personal">Personal</Radio>
          <Radio value="teams">Teams</Radio>
        </Radio.Group> */}
        {/* <Spacer />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Radio.Group
            css={{ textAlign: "center", alignItems: "center" }}
            size="xs"
            orientation="horizontal"
            label="Select your plan"
          >
            <Radio value="free">Free</Radio>
            <Radio value="pro">Pro</Radio>
          </Radio.Group>
        </div>
        <Spacer /> */}
        <Card>
          <Card.Header>
            <Text h4 css={{ textTransform: "capitalize" }}>
              {plan}
            </Text>
          </Card.Header>
          <Card.Body>
            <Text></Text>
          </Card.Body>
        </Card>
        <Spacer />
        <div className={styles.nameContainer}>
          <Input
            placeholder="First name"
            fullWidth
            bordered
            size="md"
            type="text"
            color="primary"
            aria-label="First name"
          />
          <Spacer />
          <Input
            placeholder="Last name"
            fullWidth
            bordered
            size="md"
            type="text"
            color="primary"
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
          color="primary"
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
          color="primary"
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
          color="primary"
          aria-label="Team name"
          contentLeft={<BiGroup />}
        />
        <Spacer />
        <Input.Password
          placeholder="Password"
          fullWidth
          bordered
          size="md"
          color="primary"
          aria-label="Password"
          contentLeft={<BiLockAlt />}
        />
        <Spacer />
      </form>
    </div>
  );
};
