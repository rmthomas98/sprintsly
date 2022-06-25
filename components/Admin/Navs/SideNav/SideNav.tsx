import styles from "./SideNav.module.scss";
import { Text, useTheme, Spacer, Divider, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  BiCalendarAlt,
  BiCloud,
  BiData,
  BiGridAlt,
  BiGroup,
  BiHive,
  BiLayer,
  BiNetworkChart,
  BiNote,
  BiTask,
  BiTime,
} from "react-icons/bi";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export const SideNav = () => {
  const { isDark } = useTheme();
  const router = useRouter();
  const [sessionData, setSessionData] = useState<any>();
  console.log(sessionData);

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
        small
        weight="bold"
        css={{ color: "$accents8", pl: "$8", letterSpacing: "$wide" }}
      >
        MAIN
      </Text>
      {/* <NextLink href="/admin">
        <Link
          className={styles.link}
          css={{ color: router.pathname.endsWith("/admin") ? "" : "$text" }}
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
                : "$text",
          }}
        >
          <BiLayer style={{ marginRight: 8 }} />
          My projects
        </Link>
      </NextLink>
      <NextLink href="/admin/my-tasks">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/my-tasks") ? "" : "$text",
          }}
        >
          <BiTask style={{ marginRight: 8 }} />
          My tasks
        </Link>
      </NextLink>
      <NextLink href="/admin/flowchart">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/flowchart") ? "" : "$text",
          }}
        >
          <BiNetworkChart style={{ marginRight: 8 }} />
          Flow chart
        </Link>
      </NextLink>
      <NextLink href="/admin/cloud">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/cloud") ? "" : "$text",
          }}
        >
          <BiCloud style={{ marginRight: 8 }} />
          Cloud storage
        </Link>
      </NextLink>
      <NextLink href="/admin/calendar">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/calendar") ? "" : "$text",
          }}
        >
          <BiCalendarAlt style={{ marginRight: 8 }} />
          Calendar
        </Link>
      </NextLink>
      <NextLink href="/admin/notes">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/notes") ? "" : "$text",
            mb: "$12",
          }}
        >
          <BiNote style={{ marginRight: 8 }} />
          Notes
        </Link>
      </NextLink>
      {sessionData?.subType === "TEAMS" && (
        <>
          <Text
            small
            weight="bold"
            css={{
              color: "$accents8",
              pl: "$8",
              letterSpacing: "$wide",
            }}
          >
            MANAGEMENT
          </Text>
          <NextLink href="/admin/my-team">
            <Link
              className={styles.link}
              css={{
                color: router.pathname.endsWith("/my-team") ? "" : "$text",
              }}
            >
              <BiGroup style={{ marginRight: 8 }} />
              My Team
            </Link>
          </NextLink>
        </>
      )}
    </div>
  );
};
