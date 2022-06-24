import {
  Button,
  Input,
  Modal,
  Text,
  Spacer,
  Link,
  Loading,
  useTheme,
} from "@nextui-org/react";
import { FaUserSecret } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const VerifyEmailForm = ({ id }: any) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const router = useRouter();
  const { isDark } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  const onSubmit = async (data: any): Promise<void> => {
    setIsLoading(true);
    const loadingToast = toast.loading("Checking code...", {
      style: toastStyle,
    });
    const postData = { id, secretCode: data.secretCode };
    const response = await axios.post(
      "/api/admin/verify-email/verify-email",
      postData
    );
    switch (response.data) {
      case "success":
        toast.success("Email verified", {
          id: loadingToast,
          style: toastStyle,
        });
        setTimeout(() => {
          router.push({ pathname: "/admin" });
        }, 1000);
        break;
      case "invalid":
        setIsLoading(false);
        toast.error("Invalid code", { id: loadingToast, style: toastStyle });
        break;
      default:
        toast.error("An error occured", {
          id: loadingToast,
          style: toastStyle,
        });
    }
  };

  const resendEmail = async (): Promise<void> => {
    if (resendLoading) return;
    setResendLoading(true);
    const loadingToast = toast.loading("Sending email", {
      style: toastStyle,
    });
    const response = await axios.post("/api/admin/verify-email/resend-email", {
      id,
    });

    if (response.data === "success") {
      setResendLoading(false);
      toast.success("Email sent!", { id: loadingToast, style: toastStyle });
    } else {
      setResendLoading(false);
      toast.error("An error has occurred.", {
        id: loadingToast,
        style: toastStyle,
      });
    }
  };

  return (
    <div style={{ zIndex: 0, position: "fixed" }}>
      <Modal open preventClose css={{ padding: "$4", py: "$8" }}>
        <Modal.Header css={{ pb: "$0" }}>
          <Text h3>Verify Your Email</Text>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body css={{ pt: "$0", pb: "$0" }}>
            <Text
              weight="medium"
              css={{ color: "$accents8", textAlign: "center" }}
              size={15}
            >
              Check your inbox for your secret code.
            </Text>
            <Spacer y={0.5} />
            <Input
              aria-label="secret code"
              contentLeft={<FaUserSecret />}
              size="md"
              placeholder="Secret Code"
              bordered
              css={{ mb: "$0", pb: "$0" }}
              {...register("secretCode", { required: true })}
            />
            <Text
              color="error"
              css={{
                mt: "$2",
                opacity: errors.secretCode ? 1 : 0,
                transition: "300ms",
                pointerEvents: "none",
              }}
              weight="semibold"
              size={12}
            >
              * Please enter your secret code
            </Text>
          </Modal.Body>
          <Modal.Footer css={{ pb: "$0", pt: "$0" }}>
            <Button disabled={isLoading} type="submit" css={{ width: "100%" }}>
              {isLoading ? <Loading size="sm" /> : "Submit"}
            </Button>
            <Spacer y={0.5} />
            <Link
              onClick={resendEmail}
              color="text"
              css={{ width: "100%", justifyContent: "center" }}
            >
              {resendLoading ? <Loading size="xs" /> : "Resend email"}
            </Link>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
