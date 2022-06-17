import styles from "./Faq.module.scss";
import { Text, Collapse, Spacer, useTheme, Button } from "@nextui-org/react";
import { BiLink, BiRightArrowAlt } from "react-icons/bi";

interface Props {
  plans: String;
}

export const Faq = (props: Props) => {
  const { isDark } = useTheme();

  return (
    <div className={styles.container}>
      <Text h2 className={styles.header}>
        Frequently asked questions
      </Text>
      <Spacer />
      <Collapse.Group
        css={{ fontSize: 14 }}
        borderWeight="normal"
        bordered={isDark ? true : false}
        shadow={isDark ? false : true}
      >
        {props.plans === "teams" && (
          <Collapse
            title="What is a subteam?"
            expanded={props.plans === "teams" ? true : false}
          >
            <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
              For each team, there can be subteams. This helps your team stay
              organized, especially if you are a large business all trying to
              work together. A subteam could be created for the marketing team,
              another one for the finance team, another one for the technology
              team, and so on.
            </Text>
            <Button
              iconRight={<BiRightArrowAlt />}
              size="xs"
              css={{ mt: "$6", pr: "$10", pl: "$4" }}
              flat
            >
              Learn more
            </Button>
          </Collapse>
        )}

        <Collapse
          title="What can I do in a project?"
          expanded={props.plans === "personal" ? true : false}
        >
          <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
            Creating a project in Sprintsly is like creating a workspace where
            you can keep all of your work organized together. You can choose who
            has access to the project and can also create "sprints" inside of
            the project, which are small tasks that you want to get done.
          </Text>
          <Button
            iconRight={<BiRightArrowAlt />}
            size="xs"
            css={{ mt: "$6", pr: "$10", pl: "$4" }}
            flat
          >
            Learn more
          </Button>
        </Collapse>
        {props.plans === "teams" && (
          <Collapse title="What can I do with roles?">
            <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
              We want you to be as organized as possible as a team. The creator
              of the team will be able to assign roles based on what kind of
              access they want someone to have. You can make someone an admin,
              moderator, or a normal user.
            </Text>
            <Button
              iconRight={<BiRightArrowAlt />}
              size="xs"
              css={{ mt: "$6", pr: "$10", pl: "$4" }}
              flat
            >
              Learn more
            </Button>
          </Collapse>
        )}

        <Collapse title="What kind of files can be uploaded?">
          <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
            All kinds of files are supported. You will be able to upload any
            file you have as long as it is under the size limit, which will be
            determined by the plan you choose.
          </Text>
        </Collapse>
        <Collapse title="Who can I share my files with?">
          <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
            You can share your files with anyone you want. You can choose to
            share your file internally or externally, meaning you can still
            share your files with people that aren&#39;t users at Sprintsly.
          </Text>
        </Collapse>
        {props.plans === "teams" && (
          <Collapse title="How does assigning tasks work?">
            <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
              You are able to assign tasks to certain people that are apart of
              your team. You can add a due date as well as different priority
              levels.
            </Text>
          </Collapse>
        )}
        {props.plans === "teams" && (
          <Collapse title="How does the live chat work?">
            <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
              Depending on what plan you pick, you will be able to have live
              chats in different channels as well as video and voice chat.
            </Text>
            <Button
              iconRight={<BiRightArrowAlt />}
              size="xs"
              css={{ mt: "$6", pr: "$10", pl: "$4" }}
              flat
            >
              Learn more
            </Button>
          </Collapse>
        )}

        <Collapse title="What are databases used for?">
          <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
            You can create your own databases for whatever kind of data you
            want. A great use case for this would be storing you customers and
            keeping info on them so they can easily be accessed at any given
            time.
          </Text>
          <Button
            iconRight={<BiRightArrowAlt />}
            size="xs"
            css={{ mt: "$6", pr: "$10", pl: "$4" }}
            flat
          >
            Learn more
          </Button>
        </Collapse>
        <Collapse title="What is time tracking?">
          <Text size={14} weight="semibold" css={{ color: "$accents8" }}>
            Time tracking is a simple feature that allows you to keep track of
            how much time has been put in for a single project. You can keep
            track of how much time a certain person has logged and a team as a
            whole. This is great if you are someone that offers services on a
            per hour basis.
          </Text>
          <Button
            iconRight={<BiRightArrowAlt />}
            size="xs"
            css={{ mt: "$6", pr: "$10", pl: "$4" }}
            flat
          >
            Learn more
          </Button>
        </Collapse>
      </Collapse.Group>
    </div>
  );
};
