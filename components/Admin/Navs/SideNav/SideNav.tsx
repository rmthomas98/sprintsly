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
  BiTime,
} from "react-icons/bi";

export const SideNav = () => {
  const { isDark } = useTheme();
  const router = useRouter();

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
          <Text weight="medium" size={22} css={{ fontFamily: "comfortaa" }}>
            Sprintsly
          </Text>
        </a>
      </NextLink>
      <Divider />
      <NextLink href="/admin">
        <Link
          className={styles.link}
          css={{ color: router.pathname.endsWith("/admin") ? "" : "$text" }}
        >
          <BiGridAlt style={{ marginRight: 8 }} />
          Overview
        </Link>
      </NextLink>
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
      <NextLink href="/admin/my-projects">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/my-projects") ? "" : "$text",
          }}
        >
          <BiLayer style={{ marginRight: 8 }} />
          My projects
        </Link>
      </NextLink>
      <NextLink href="/admin/my-cloud">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/my-cloud") ? "" : "$text",
          }}
        >
          <BiCloud style={{ marginRight: 8 }} />
          My cloud
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
      <NextLink href="/admin/database">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/database") ? "" : "$text",
          }}
        >
          <BiData style={{ marginRight: 8 }} />
          Database
        </Link>
      </NextLink>
      <NextLink href="/admin/time-tracker">
        <Link
          className={styles.link}
          css={{
            color: router.pathname.endsWith("/time-tracker") ? "" : "$text",
          }}
        >
          <BiTime style={{ marginRight: 8 }} />
          Time tracker
        </Link>
      </NextLink>
    </div>
  );
};
