import {
  Row,
  Button,
  Card,
  Text,
  Divider,
  Spacer,
  Tooltip,
} from "@nextui-org/react";
import { BiMeteor } from "react-icons/bi";
import Link from "next/link";

export const PersonalCards = () => {
  return (
    <>
      <Card
        isHoverable
        css={{ padding: "$8", pb: "$20", position: "relative" }}
      >
        <Row>
          <Text
            weight="semibold"
            size={14}
            css={{
              color: "$accents6",
              letterSpacing: "$wide",
              // padding: "$2",
              px: "$6",
              py: "$0",
              borderRadius: "$xs",
              background: "$accents1",
              width: "fit-content",
            }}
          >
            Free
          </Text>
        </Row>
        <Row css={{ my: "$2" }}>
          <Text h2>
            $0.00
            <Text span small>
              {" "}
              / month
            </Text>
          </Text>
        </Row>
        <Divider css={{ mb: "$6" }} />
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />

          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Up to 5 projects
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            15gb cloud storage
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            15mb max file size
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Share files with anyone
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Create tasks/todo
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Calendar view
          </Text>
        </Row>
        <Button
          css={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
          }}
          flat
        >
          Select plan
        </Button>
      </Card>
      <Spacer />
      <Card
        isHoverable
        css={{ padding: "$8", pb: "$20", position: "relative" }}
      >
        <Row>
          <Text
            weight="semibold"
            size={14}
            css={{
              color: "$accents6",
              letterSpacing: "$wide",
              // padding: "$2",
              px: "$6",
              py: "$0",
              borderRadius: "$xs",
              background: "$accents1",
              width: "fit-content",
            }}
          >
            Pro
          </Text>
        </Row>
        <Row css={{ my: "$2" }}>
          <Text h2>
            $5.00
            <Text span small>
              {" "}
              / month
            </Text>
          </Text>
        </Row>
        <Divider css={{ mb: "$6" }} />
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Unlimited projects
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Unlimited cloud storage
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            1gb file uploads
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Share files with anyone
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Create tasks/todo
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Calendar view
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Databases
          </Text>
        </Row>
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Time tracking
          </Text>
        </Row>
        {/* <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Live video/voice chat
          </Text>
        </Row> */}
        <Row align="center">
          <BiMeteor color="#FF2EC4" style={{ marginRight: 8 }} />
          <Text
            weight="bold"
            color="#787F85"
            size={14}
            css={{ letterSpacing: "$wide" }}
          >
            Client guest access
          </Text>
        </Row>
        <Link href="/signup">
          <Button
            css={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
            }}
            color="gradient"
          >
            Select plan
          </Button>
        </Link>
      </Card>
    </>
  );
};
