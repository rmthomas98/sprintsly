import styles from "./Picture.module.scss";
import {
  Card,
  Text,
  Button,
  Input,
  Avatar,
  Spacer,
  useTheme,
  Loading,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

export const Picture = ({ user }: any) => {
  const [preview, setPreview] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { isDark } = useTheme();
  const router = useRouter();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  const handleImageUpload = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedImage(null);
      return;
    }

    if (e.target.files[0].type.includes("image")) {
      if (e.target.files[0].size < 2000000) {
        setUploadedImage(e.target.files[0]);
      } else {
        // alert("Image is too large");
        toast.error("Image must be smaller than 2MB", { style: toastStyle });
      }
    } else {
      // alert ("Image is not an image");
      toast.error("File must be a valid image", { style: toastStyle });
    }
  };

  useEffect(() => {
    if (!uploadedImage) {
      setPreview(null);
      return;
    }

    const objectURL = URL.createObjectURL(uploadedImage);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [uploadedImage]);

  useEffect(() => {
    if (!preview) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);

    return () => {
      setIsDisabled(true);
    };
  }, [preview]);

  const handleImageUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", uploadedImage);
    formData.append("id", user.id);
    const response = await axios.post(
      "/api/admin/profile/update-image",
      formData
    );
    if (response.data === "success") {
      toast.success("Image updated successfully", { style: toastStyle });
      setIsLoading(false);
      setIsDisabled(true);
      router.replace(router.asPath);
    } else {
      toast.error("Image update failed", { style: toastStyle });
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Text h4 weight="medium">
          Your profile picture
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <div className={styles.flexContainer}>
          <label htmlFor="avatar" style={{ cursor: "pointer" }}>
            <Avatar
              size="xl"
              src={preview ? preview : user.image}
              squared
              bordered
              color="gradient"
              pointer
            />
          </label>
          <Input
            type="file"
            id="avatar"
            css={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <div className={styles.footerContainer}>
          <Text size={14} weight="medium" css={{ color: "$accents8" }}>
            Update your picture
          </Text>
          <Button
            onClick={handleImageUpdate}
            size="sm"
            shadow
            disabled={isDisabled || isLoading}
          >
            {isLoading ? <Loading size="xs" /> : "Update"}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
