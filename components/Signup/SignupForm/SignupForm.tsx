import styles from "./SignupForm.module.scss";
import {
  Input,
  Spacer,
  Card,
  Text,
  Button,
  Loading,
  Tooltip,
} from "@nextui-org/react";
import {
  BiLockAlt,
  BiEnvelope,
  BiUser,
  BiGroup,
  BiRightArrowAlt,
  BiLeftArrowAlt,
} from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  accountInfo: any;
  setAccountInfo: any;
  setStep: any;
}

export const SignupForm = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [teamNameError, setTeamNameError] = useState<boolean>(false);

  const onSubmit = async (data: any): Promise<void> => {
    if (data.username.includes(" ")) return;
    if (data.teamName?.includes(" ")) return;
    setIsLoading(true);
    let response: any;
    if (props.accountInfo.plan === "personal") {
      response = await axios.post("/api/signup/personal-free-signup", data);
    } else {
      response = await axios.post("/api/signup/teams-free-signup", data);
    }

    // check response
    switch (response.data) {
      case "success":
        router.push({
          pathname: "/verify-email",
          query: { email: data.email },
        });
        break;
      case "email":
        setIsLoading(false);
        setCredentials("email");
        break;
      case "username":
        setIsLoading(false);
        setCredentials("username");
        break;
      case "error":
        setIsLoading(false);
        setError(true);
        break;
    }
  };

  const nextStep = async (data: any): Promise<void> => {
    if (data.username.includes(" ")) return;
    if (data.teamName?.includes(" ")) return;
    setIsLoading(true);
    const { firstName, lastName, email, username, teamName, password } = data;
    const response = await axios.post("/api/signup/check", {
      email,
      username,
    });

    switch (response.data) {
      case "clear":
        props.setAccountInfo({
          plan: props.accountInfo.plan,
          tier: props.accountInfo.tier,
          firstName,
          lastName,
          email,
          username,
          teamName,
          password,
        });
        setIsLoading(false);
        props.setStep(3);
        break;
      case "email":
        setCredentials("email");
        setIsLoading(false);
        break;
      case "username":
        setCredentials("username");
        setIsLoading(false);
        break;
    }
  };

  const handleSubmission = (data: any) => {
    if (props.accountInfo.tier === "free") {
      onSubmit(data);
    } else {
      nextStep(data);
    }
  };

  useEffect(() => {
    if (watch("username").includes(" ") && watch("username").length > 0) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (watch("teamName")?.includes(" ") && watch("teamName")?.length > 0) {
      setTeamNameError(true);
    } else {
      setTeamNameError(false);
    }
  }, [watch("username"), watch("teamName")]);

  return (
    <div className={`${styles.container} ${styles.fade}`}>
      <Card css={{ px: "$8", py: "$4" }} isHoverable>
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
      <form onSubmit={handleSubmit(handleSubmission)}>
        <div className={styles.nameContainer}>
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              placeholder="First name"
              fullWidth
              bordered={!errors.firstName}
              status={errors.firstName && "error"}
              size="md"
              type="text"
              aria-label="First name"
              {...register("firstName", { required: true })}
            />
            <Text
              color="error"
              css={{
                position: "absolute",
                marginTop: 1,
                opacity: errors.firstName ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Please enter your first name
            </Text>
          </div>
          <Spacer />
          <div style={{ width: "100%", position: "relative" }}>
            <Input
              placeholder="Last name"
              fullWidth
              bordered={!errors.lastName}
              status={errors.lastName && "error"}
              size="md"
              type="text"
              aria-label="Last name"
              {...register("lastName", { required: true })}
            />
            <Text
              color="error"
              css={{
                position: "absolute",
                marginTop: 1,
                opacity: errors.lastName ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Please enter your last name
            </Text>
          </div>
        </div>
        <Spacer y={1.3} />
        <Input
          placeholder="Email"
          fullWidth
          bordered={!errors.email || credentials === "email"}
          status={errors.email || credentials === "email" ? "error" : "default"}
          size="md"
          type="email"
          aria-label="Email"
          contentLeft={<BiEnvelope />}
          {...register("email", {
            required: true,
          })}
        />
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: errors.email ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Please enter your email
        </Text>
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: credentials === "email" ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Email is already in use
        </Text>
        <Spacer y={1.3} />
        <Input
          placeholder="Username"
          fullWidth
          bordered={!errors.username || credentials === "username"}
          status={
            errors.username || credentials === "username" ? "error" : "default"
          }
          size="md"
          type="text"
          aria-label="Username"
          contentLeft={<BiUser />}
          {...register("username", { required: true, maxLength: 20 })}
        />
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: errors.username?.type === "required" ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Please enter a username
        </Text>
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: credentials === "username" ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Username is already in use
        </Text>
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: errors.username?.type === "maxLength" ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Username must be 20 characters or less
        </Text>
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: usernameError ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Username can&#39;t contain spaces
        </Text>
        <Spacer y={1.3} />
        {props.accountInfo.plan === "teams" && (
          <>
            <Input
              placeholder="Team name"
              fullWidth
              bordered={!errors.teamName}
              status={errors.teamName && "error"}
              size="md"
              type="text"
              aria-label="Team name"
              contentLeft={<BiGroup />}
              {...register("teamName", { required: true, maxLength: 20 })}
            />

            <Text
              color="error"
              css={{
                position: "absolute",
                marginTop: 1,
                opacity: errors.teamName?.type === "required" ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Please enter a team name
            </Text>
            <Text
              color="error"
              css={{
                position: "absolute",
                marginTop: 1,
                opacity: errors.teamName?.type === "maxLength" ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Team name must be 20 characters or less
            </Text>
            <Text
              color="error"
              css={{
                position: "absolute",
                marginTop: 1,
                opacity: teamNameError ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Team name can&#39;t contain spaces
            </Text>
            <Spacer y={1.3} />
          </>
        )}

        <Input.Password
          placeholder="Password"
          fullWidth
          bordered={!errors.password}
          status={errors.password && "error"}
          size="md"
          aria-label="Password"
          contentLeft={<BiLockAlt />}
          {...register("password", { required: true, minLength: 8 })}
        />
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: errors.password?.type === "minLength" ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Password must be 8 characters
        </Text>
        <Text
          color="error"
          css={{
            position: "absolute",
            marginTop: 1,
            opacity: errors.password?.type === "required" ? 1 : 0,
            transition: "300ms",
            pointerEvents: "none",
          }}
          weight="semibold"
          size={12}
        >
          * Please enter a password
        </Text>
        <Spacer y={1.3} />
        <Button
          css={{ width: "100%" }}
          disabled={isLoading}
          type="submit"
          // size="lg"
          shadow
          color={props.accountInfo.tier === "free" ? "gradient" : "primary"}
          iconRight={
            props.accountInfo.tier === "pro" && <BiRightArrowAlt size={18} />
          }
        >
          {isLoading ? (
            <Loading size="sm" />
          ) : props.accountInfo.tier === "pro" ? (
            "Continue to payment"
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </div>
  );
};
