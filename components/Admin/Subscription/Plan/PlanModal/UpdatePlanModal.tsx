import {
  Modal,
  Text,
  Button,
  Table,
  Row,
  Spacer,
  Loading,
  useTheme,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export const UpdatePlanModal = ({
  user,
  updatePlanModal,
  setUpdatePlanModal,
  setPaymentModal,
  selectedPlan,
  setSelectedPlan,
}: any) => {
  const [currentPlan, setCurrentPlan] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isDark } = useTheme();
  const router = useRouter();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  useEffect(() => {
    if (user.subscription.type === "PERSONAL") {
      if (user.subscription.tier === "FREE") {
        setCurrentPlan("personal-free");
        setSelectedPlan("personal-free");
      } else {
        setCurrentPlan("personal-pro");
        setSelectedPlan("personal-pro");
      }
    } else {
      if (user.subscription.tier === "FREE") {
        setCurrentPlan("teams-free");
        setSelectedPlan("teams-free");
      } else {
        setCurrentPlan("teams-pro");
        setSelectedPlan("teams-pro");
      }
    }
  }, []);

  const handleSubmit = async () => {
    let response;
    if (
      (currentPlan === "personal-free" && selectedPlan === "personal-pro") ||
      (currentPlan === "teams-free" && selectedPlan === "teams-pro") ||
      (currentPlan === "teams-free" && selectedPlan === "personal-pro") ||
      (currentPlan === "personal-free" && selectedPlan === "teams-pro")
    ) {
      setUpdatePlanModal(false);
      setPaymentModal(true);
    } else if (
      (currentPlan === "personal-pro" && selectedPlan === "personal-free") ||
      (currentPlan === "teams-pro" && selectedPlan === "teams-free")
    ) {
      setIsLoading(true);
      response = await axios.post("/api/admin/subscription/period-end", {
        id: user.subscription.id,
        periodEndAction: true,
        subscriptionId: user.subscription.subscriptionId,
      });
    }

    if (response) {
      if (response.data.status === "success") {
        setIsLoading(false);
        setUpdatePlanModal(false);
        router.replace(router.asPath);
        toast.success("Successfully updated plan", { style: toastStyle });
      } else {
        setIsLoading(false);
        setUpdatePlanModal(false);
        toast.error("Failed to update plan", { style: toastStyle });
      }
    }
  };

  return (
    <Modal
      open={updatePlanModal}
      onClose={() => setUpdatePlanModal(false)}
      css={{ py: "$6" }}
    >
      <Modal.Header>
        <Text h3>Change your plan</Text>
      </Modal.Header>
      <Modal.Body>
        <Table
          selectionMode="single"
          bordered
          showSelectionCheckboxes={true}
          defaultSelectedKeys={[currentPlan]}
          aria-label="plans"
          onSelectionChange={(selected: any) => {
            setSelectedPlan(selected.currentKey);
          }}
        >
          <Table.Header>
            <Table.Column>PLAN</Table.Column>
            <Table.Column>PRICE</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="personal-free">
              <Table.Cell key="plan">
                <Text size={15} weight="medium" color="inherit">
                  Personal Free
                </Text>
              </Table.Cell>
              <Table.Cell key="price">
                <Text size={15} weight="medium" color="inherit">
                  $0.00/month
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row key="personal-pro">
              <Table.Cell key="plan">
                <Text size={15} weight="medium" color="inherit">
                  Personal Pro
                </Text>
              </Table.Cell>
              <Table.Cell key="price">
                <Text size={15} weight="medium" color="inherit">
                  $5.00/month
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row key="teams-free">
              <Table.Cell key="plan">
                <Text size={15} weight="medium" color="inherit">
                  Teams Free
                </Text>
              </Table.Cell>
              <Table.Cell key="price">
                <Text size={15} weight="medium" color="inherit">
                  $0.00/month
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row key="teams-pro">
              <Table.Cell key="plan">
                <Text size={14} weight="medium" color="inherit">
                  Teams Pro
                </Text>
              </Table.Cell>
              <Table.Cell key="price">
                <Text size={14} weight="medium" color="inherit">
                  $7.00/user/month
                </Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Row justify="center">
          <Button
            flat
            color="error"
            css={{ width: "100%" }}
            auto
            onClick={() => setUpdatePlanModal(false)}
          >
            Close
          </Button>
          <Spacer x={0.6} />
          <Button
            css={{ width: "100%" }}
            auto
            shadow
            disabled={currentPlan === selectedPlan ? true : false || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <Loading size="xs" /> : "Change"}
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};
