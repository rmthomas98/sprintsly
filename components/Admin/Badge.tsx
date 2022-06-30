import { Text } from "@nextui-org/react";

export const Badge = ({ type, text }: any) => {
  switch (type) {
    case "success":
      return (
        <Text
          size={11}
          weight="semibold"
          css={{
            letterSpacing: "$wider",
            textTransform: "uppercase",
            background: "$successLight",
            color: "$successLightContrast",
            width: "fit-content",
            px: "$4",
            borderRadius: "$pill",
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      );
      break;
    case "error":
      return (
        <Text
          size={11}
          weight="semibold"
          css={{
            letterSpacing: "$wider",
            textTransform: "uppercase",
            background: "$errorLight",
            color: "$errorLightContrast",
            width: "fit-content",
            px: "$4",
            borderRadius: "$pill",
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      );
      break;
    default:
      return (
        <Text
          size={11}
          weight="semibold"
          css={{
            letterSpacing: "$wider",
            textTransform: "uppercase",
            background: "$warningLight",
            color: "$warningLightContrast",
            width: "fit-content",
            px: "$4",
            borderRadius: "$pill",
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      );
  }
};
