import styles from "./Footer.module.scss";
import Image from "next/image";
import { Spacer, Text, useTheme, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

export const Footer = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={styles.wrapper}
      style={{
        borderTop: isDark ? "1px solid #26292b" : "1px solid #ecedee",
      }}
    >
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.companyContainer}>
            <div>
              <NextLink href="/">
                <a className={styles.logoName}>
                  <Text
                    weight="medium"
                    size={22}
                    css={{ fontFamily: "comfortaa" }}
                  >
                    Sprintsly
                  </Text>
                </a>
              </NextLink>
              <div className={styles.socialIconContainer}>
                <Link href="/" css={{ color: "$accents7" }}>
                  <BsFacebook size={18} style={{ cursor: "pointer" }} />
                </Link>
                <Spacer x={0.4} />
                <Link href="/" css={{ color: "$accents7" }}>
                  <BsLinkedin size={18} style={{ cursor: "pointer" }} />
                </Link>
                <Spacer x={0.4} />
                <Link href="/" css={{ color: "$accents7" }}>
                  <BsTwitter size={18} style={{ cursor: "pointer" }} />
                </Link>
              </div>
            </div>
            <Text size={13} weight="medium" css={{ color: "$accents8" }}>
              &copy; Sprintsly 2022. All rights reserved
            </Text>
          </div>
          <div className={styles.linkContainer}>
            <div className={styles.exploreContainer}>
              <Text h4 weight="medium" css={{ mb: "$5" }}>
                Explore
              </Text>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                    mb: "$2",
                  }}
                >
                  Products
                </Link>
              </NextLink>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                    mb: "$2",
                  }}
                >
                  Plans
                </Link>
              </NextLink>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                  }}
                >
                  Pricing
                </Link>
              </NextLink>
            </div>
            <div className={styles.documents}>
              <Text h4 weight="medium" css={{ mb: "$5" }}>
                Company
              </Text>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                    mb: "$2",
                  }}
                >
                  About us
                </Link>
              </NextLink>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                    mb: "$2",
                  }}
                >
                  Privacy policy
                </Link>
              </NextLink>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                  }}
                >
                  Terms of service
                </Link>
              </NextLink>
            </div>
            <div className={styles.contact}>
              <Text h4 weight="medium" css={{ mb: "$5" }}>
                Contact us
              </Text>
              <Link
                href="mailto:support@sprintsly.io"
                target="_blank"
                rel="noreferrer"
                css={{
                  fontSize: 14,
                  fontWeight: "$semibold",
                  color: "$accents8",
                  mb: "$2",
                }}
              >
                support@sprintsly.io
              </Link>
              <NextLink href="/">
                <Link
                  css={{
                    fontSize: 14,
                    fontWeight: "$semibold",
                    color: "$accents8",
                  }}
                >
                  Feedback
                </Link>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
