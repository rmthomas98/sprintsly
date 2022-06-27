import styles from "./Card.module.scss";
import {
  Card,
  Text,
  Input,
  useTheme,
  Button,
  Loading,
} from "@nextui-org/react";
import { BiUserCheck } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

export const Username = ({ user }: any) => {
  const [username, setUsername] = useState<any>(user.username);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
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
    if (
      !username ||
      username.length > 20 ||
      username.includes(" ") ||
      username === user.username
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [username]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const options: any = { id: user.id, username: data.username };
    const response = await axios.post(
      "/api/admin/profile/update-username",
      options
    );

    if (response.data === "success") {
      setIsLoading(false);
      setIsDisabled(true);
      toast.success("Username updated successfully", { style: toastStyle });
      router.replace(router.asPath);
    } else if (response.data === "username in use") {
      setIsLoading(false);
      toast.error("Username is already in use", { style: toastStyle });
    } else {
      setIsLoading(false);
      toast.error("Error updating username", { style: toastStyle });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", width: "100%" }}
    >
      <Card isHoverable>
        <Card.Header>
          <Text h4 weight="medium">
            Your username
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ pb: "$10" }}>
          <Input
            placeholder="Username"
            aria-label="username"
            bordered
            spellCheck={false}
            contentLeft={<BiUserCheck />}
            {...register("username", {
              required: true,
              value: username,
              onChange(e) {
                setUsername(e.target.value);
              },
            })}
          />
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <div className={styles.footerContainer}>
            <Text weight="medium" size={14} css={{ color: "$accents8" }}>
              Update username
            </Text>
            <Button
              auto
              type="submit"
              size="sm"
              shadow
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
