import styles from "./SideNav.module.scss";
import { Text, useTheme, Spacer, Divider, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

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
        <Link className={styles.link} color="text">
          Overview
          <span></span>
        </Link>
      </NextLink>
    </div>
  );
};
