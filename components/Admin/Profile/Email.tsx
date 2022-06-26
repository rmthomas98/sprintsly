import styles from "./Card.module.scss";
import {
  Card,
  Input,
  Text,
  Button,
  useTheme,
  Loading,
  Modal,
  Spacer,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { FaUserSecret } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";

export const Email = ({ user }: any) => {
  const [email, setEmail] = useState<any>(user.email);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const { isDark } = useTheme();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  useEffect(() => {
    if (user.email !== email && email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    const options: any = { id: user.id, email: data.email };
    const response = await axios.post(
      "/api/admin/profile/email/send-email-verification",
      options
    );
    if (response.data === "success") {
      setIsDisabled(true);
      setIsLoading(false);
      setIsActive(true);
    } else if (response.data === "email in use") {
      setIsLoading(false);
      toast.error("Email is already in use", { style: toastStyle });
    } else {
      setIsLoading(false);
      toast.error("Error updating email", { style: toastStyle });
    }
  };

  const onEmailVerify = async (data: any) => {
    setModalLoading(true);
    const options: any = { id: user.id, code: data.code, email: email };
    const response = await axios.post(
      "/api/admin/profile/email/verify-email",
      options
    );
    if (response.data === "success") {
      setModalLoading(false);
      setIsActive(false);
      toast.success("Email verified successfully", { style: toastStyle });
      router.replace(router.asPath);
    } else if (response.data === "invalid code") {
      setModalLoading(false);
      setIsActive(false);
      toast.error("Invalid code", { style: toastStyle });
    } else {
      setModalLoading(false);
      setIsActive(false);
      toast.error("Error verifying email", { style: toastStyle });
    }
  };

  return (
    <>
      <form
        style={{ width: "100%", display: "flex" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card isHoverable>
          <Card.Header>
            <Text h4 weight="medium">
              Your email
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ pb: "$10" }}>
            <Input
              type="email"
              bordered
              placeholder="Email"
              contentLeft={<BiEnvelope />}
              aria-label="email"
              {...register("email", {
                required: true,
                value: email,
                onChange(e) {
                  setEmail(e.target.value);
                },
              })}
            />
            <Text
              color="error"
              css={{
                mt: "$2",
                opacity: errors.email ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Please enter your email
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <div className={styles.footerContainer}>
              <Text size={14} weight="medium" css={{ color: "$accents8" }}>
                Update email
              </Text>
              <Button
                type="submit"
                size="sm"
                shadow
                disabled={isDisabled || isLoading}
              >
                {isLoading ? <Loading size="xs" /> : "Update"}
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </form>
      {isActive && (
        <Modal open={isActive} preventClose css={{ pt: "$8", pb: "$4" }} blur>
          <form onSubmit={handleSubmit(onEmailVerify)}>
            <Modal.Header css={{ flexDirection: "column" }}>
              <Text h3 weight="medium">
                Verify your email
              </Text>
              <Text
                size={14}
                weight="medium"
                css={{ textAlign: "center", color: "$accents8" }}
              >
                Check your inbox for the code we emailed you.
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                placeholder="Verfication code"
                bordered
                contentLeft={<FaUserSecret />}
                aria-label="verification code"
                {...register("code", { required: true })}
              />
            </Modal.Body>
            <Modal.Footer css={{ justifyContent: "center" }}>
              <Button
                type="submit"
                disabled={modalLoading}
                css={{ width: "100%", mb: "$8" }}
              >
                {modalLoading ? <Loading size="xs" /> : "Verify email"}
              </Button>
              {/* <Link color="text">Resend email</Link> */}
            </Modal.Footer>
          </form>
        </Modal>
      )}
    </>
  );
};
