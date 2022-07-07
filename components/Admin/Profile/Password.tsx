import styles from "./Card.module.scss";
import {
  Card,
  Text,
  Button,
  Loading,
  useTheme,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

export const Password = ({ user }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { isDark } = useTheme();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  useEffect(() => {
    if (!watch("password") || watch("password").length < 8) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [watch("password")]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const session: any = await getSession();
    const options: any = { id: session.id, password: data.password };
    const response = await axios.post(
      "/api/admin/profile/update-password",
      options
    );
    if (response.status === 200) {
      setIsDisabled(true);
      setIsLoading(false);
      reset();
      toast.success("Password updated successfully", { style: toastStyle });
      router.replace(router.asPath);
    } else {
      setIsLoading(false);
      toast.error("Error updating password", { style: toastStyle });
    }
  };

  return (
    <form
      style={{ display: "flex", width: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card isHoverable>
        <Card.Header>
          <Text h4 weight="medium">
            Your password
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ pb: "$16" }}>
          <Input.Password
            placeholder="Password"
            bordered
            contentLeft={<BiLock />}
            aria-label="password"
            {...register("password", { required: true })}
          />
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <div className={styles.footerContainer}>
            <Text size={14} weight="medium" css={{ color: "$accents8" }}>
              Update password
            </Text>
            <Button
              type="submit"
              size="sm"
              shadow
              auto
              css={{ width: 81 }}
              disabled={isDisabled || isLoading}
            >
              {isLoading ? <Loading size="xs" /> : "Update"}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </form>
  );
};
