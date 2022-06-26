import styles from "./SideNav.module.scss";
import { Text, useTheme, Spacer, Divider, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  BiBell,
  BiCalendarAlt,
  BiCloud,
  BiData,
  BiGridAlt,
  BiGroup,
  BiHive,
  BiLayer,
  BiMessageSquare,
  BiNetworkChart,
  BiNote,
  BiTask,
  BiTime,
  BiUserCheck,
} from "react-icons/bi";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export const SideNav = () => {
  const { isDark } = useTheme();
  const router = useRouter();
  const [sessionData, setSessionData] = useState<any>();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const session = await getSession();
      const id = session?.id;
      const response = await axios.post("/api/admin/get-user", { id });
      setSessionData(response.data);
    };
    getData();
  }, []);

  return (
    <div
      className={styles.container}
      style={{ background: isDark ? "#16181A" : "#F1F3F5" }}
    >
      <NextLink href="/admin">
        <a className={styles.logoContainer}>
          <Image
            src="/images/transparent-logo.png"
            height={45}
            width={45}
            alt="sprintsly logo"
          />
          <Spacer x={0.3} />
          <Text
            small
            weight="medium"
            size={22}
            css={{ fontFamily: "comfortaa" }}
          >
            Sprintsly
          </Text>
        </a>
      </NextLink>
      <Divider css={{ mb: "$6" }} />
      <Text
        weight="bold"
        css={{
          color: "$accents8",
          pl: "$8",
          letterSpacing: "$wide",
          fontSize: 11,
        }}
      >
        MAIN
      </Text>
      {/* <NextLink href="/admin">
        <Link
          className={styles.link}
          css={{ color: router.pathname.endsWith("/admin") ? "" : "$accents7" }}
        >
          <BiGridAlt style={{ marginRight: 8 }} />
          Overview
        </Link>
      </NextLink> */}
      <NextLink href="/admin">
        <Link
          className={styles.link}
          css={{
            color:
              router.pathname.endsWith("/admin") ||
              router.pathname.includes("project-view")
                ? ""
                : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiLayer style={{ marginRight: 8 }} size={18} />
          My projects
          <span
            className={styles.bar}
            style={{
              height:
                router.pathname.endsWith("/admin") ||
                router.pathname.includes("/project-view")
                  ? "100%"
                  : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/tasks">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/tasks") ? "" : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiTask style={{ marginRight: 8 }} size={18} />
          My tasks
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/tasks") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/flowchart">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/flowchart") ? "" : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiNetworkChart style={{ marginRight: 8 }} size={18} />
          Flow chart
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/flowchart") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/cloud">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/cloud") ? "" : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiCloud style={{ marginRight: 8 }} size={18} />
          Cloud storage
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/cloud") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/calendar">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/calendar") ? "" : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiCalendarAlt style={{ marginRight: 8 }} size={18} />
          Calendar
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/calendar") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/notes">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/notes") ? "" : "$accents7",
            mb: "$12",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiNote style={{ marginRight: 8 }} size={18} />
          Notes
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/notes") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>

      <Text
        weight="bold"
        css={{
          color: "$accents8",
          pl: "$8",
          letterSpacing: "$wide",
          fontSize: 11,
        }}
      >
        COMMUNITY
      </Text>
      <NextLink href="/admin/friends">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.includes("/friends") ? "" : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiUserCheck style={{ marginRight: 8 }} size={18} />
          My friends
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/friends") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/messages">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.includes("messages") ? "" : "$accents7",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiMessageSquare style={{ marginRight: 8 }} size={18} />
          Messages
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/messages") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      <NextLink href="/admin/notifications">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/notifications")
              ? ""
              : "$accents7",
            mb: "$12",
            fontSize: 14,
            fontWeight: "$semibold",
          }}
        >
          <BiBell style={{ marginRight: 8 }} size={18} />
          Notifications
          <span
            className={styles.bar}
            style={{
              height: router.pathname.endsWith("/notifications") ? "100%" : "",
            }}
          ></span>
        </Link>
      </NextLink>
      {sessionData?.subType === "TEAMS" && (
        <>
          <Text
            weight="bold"
            css={{
              color: "$accents8",
              pl: "$8",
              letterSpacing: "$wide",
              fontSize: 11,
            }}
          >
            MANAGEMENT
          </Text>
          <NextLink href="/admin/team">
            <Link
              className={styles.link}
              css={{
                color: router.pathname.endsWith("/team") ? "" : "$accents7",
                fontSize: 14,
                fontWeight: "$semibold",
              }}
            >
              <BiGroup style={{ marginRight: 8 }} size={18} />
              My Team
              <span
                className={styles.bar}
                style={{
                  height: router.pathname.endsWith("/team") ? "100%" : "",
                }}
              ></span>
            </Link>
          </NextLink>
        </>
      )}
    </div>
  );
};
