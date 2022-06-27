import styles from "./Card.module.scss";
import {
  Text,
  Card,
  Input,
  Button,
  useTheme,
  Loading,
} from "@nextui-org/react";
import { BiShield } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export const Position = ({ user }: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [position, setPosition] = useState(user.position || "");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isDark } = useTheme();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  useEffect(() => {
    if (position && position !== user.position) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [position]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const options: any = { position: data.position, id: user.id };
    const response = await axios.post(
      "/api/admin/profile/update-position",
      options
    );

    if (response.status === 200) {
      setIsLoading(false);
      setIsDisabled(true);
      router.replace(router.asPath);
      toast.success("Successfully updated position!", { style: toastStyle });
    } else {
      setIsLoading(false);
      toast.error("Failed to update position!", { style: toastStyle });
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
            Your position
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ justifyContent: "center", pb: "$10" }}>
          <Input
            aria-label="position"
            type="text"
            placeholder="Sales, finance, etc."
            shadow
            bordered
            contentLeft={<BiShield />}
            value={position}
            {...register("position", {
              required: true,
              value: position,
              onChange(e) {
                setPosition(e.target.value);
              },
            })}
          />
          <Text
            color="error"
            css={{
              mt: "$2",
              opacity: errors.position ? 1 : 0,
              transition: "300ms",
              pointerEvents: "none",
            }}
            weight="semibold"
            size={12}
          >
            * Please enter your position
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <div className={styles.footerContainer}>
            <Text size={14} weight="medium" css={{ color: "$accents8" }}>
              Update position
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
