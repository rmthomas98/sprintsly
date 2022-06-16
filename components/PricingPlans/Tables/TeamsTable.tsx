import { Table, Text, Spacer, useTheme } from "@nextui-org/react";
import styles from "./Tables.module.scss";
import { BiCheck, BiX } from "react-icons/bi";

export const TeamsTable = () => {
  const { isDark } = useTheme();

  return (
    <div className={styles.container}>
      <Text h2 className={styles.header}>
        Compare{" "}
        <Text
          span
          weight="bold"
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
          }}
        >
          teams
        </Text>{" "}
        tiers
      </Text>
      <Spacer />
      <Table
        css={{ height: "auto", width: "100%" }}
        bordered={isDark ? true : false}
        lined
      >
        <Table.Header>
          <Table.Column>FATURES</Table.Column>
          <Table.Column>FREE</Table.Column>
          <Table.Column>PRO</Table.Column>
        </Table.Header>
        <Table.Body key="1">
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Teams
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              1 Team
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              1 Team
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Subteams
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Up to 3
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Unlimited
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Members
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Up to 5
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Unlimited
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Projects
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Up to 5
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Unlimited
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Cloud storage
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              15GB
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              Unlimited
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              File sharing
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Calendar view
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Create tasks
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Live chat
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Voice/video chat
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiX size={18} color="#F31260" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Chat channels
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiX size={18} color="#F31260" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Assign roles
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiX size={18} color="#F31260" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Databases
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiX size={18} color="#F31260" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Time tracking
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiX size={18} color="#F31260" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell css={{ fontSize: 14, fontWeight: "$semibold" }}>
              Guest access
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiX size={18} color="#F31260" />
            </Table.Cell>
            <Table.Cell
              css={{
                fontSize: 14,
                fontWeight: "$semibold",
                color: "$accents8",
              }}
            >
              <BiCheck size={18} color="#17C964" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
