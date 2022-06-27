import styles from "./Card.module.scss";
import {
  Card,
  Input,
  Text,
  Button,
  useTheme,
  Loading,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { BiUser } from "react-icons/bi";

export const Name = ({ user }: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState<any>(user.name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { isDark } = useTheme();
  const router = useRouter();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  useEffect(() => {
    if (user.name !== name && name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const options: any = { id: user.id, name: data.name };
    const response = await axios.post(
      "/api/admin/profile/update-name",
      options
    );
    if (response.status === 200) {
      setIsDisabled(true);
      setIsLoading(false);
      toast.success("Name updated successfully", { style: toastStyle });
      router.replace(router.asPath);
    } else {
      setIsLoading(false);
      toast.error("Error updating name", { style: toastStyle });
    }
  };

  return (
    <form
      style={{ width: "100%", display: "flex" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card isHoverable>
        <Card.Header>
          <Text h4 weight="medium">
            Your name
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ pb: "$10" }}>
          <Input
            type="text"
            placeholder="Name"
            bordered
            contentLeft={<BiUser />}
            aria-label="name"
            {...register("name", {
              required: true,
              value: name,
              onChange(e) {
                setName(e.target.value);
              },
            })}
          />
          <Text
            color="error"
            css={{
              mt: "$2",
              opacity: errors.name ? 1 : 0,
              transition: "300ms",
              pointerEvents: "none",
            }}
            weight="semibold"
            size={12}
          >
            * Please enter your name
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <div className={styles.footerContainer}>
            <Text size={14} weight="medium" css={{ color: "$accents8" }}>
              Update name
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
