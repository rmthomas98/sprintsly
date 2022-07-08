import { Modal, Text, Button, Row, Spacer } from "@nextui-org/react";
import axios from "axios";
import { getSession } from "next-auth/react";

export const ConfirmationModal = ({
  setConfirmationModal,
  confirmationModal,
  selectedPlan,
}: any) => {
  const handleSubmit = async () => {
    const session: any = await getSession();
    const response = axios.post("/api/admin/subscription/cross-downgrade", {
      id: session.id,
      plan: selectedPlan,
    });
  };

  return (
    <Modal
      open={confirmationModal}
      css={{ py: "$6" }}
      onClose={() => setConfirmationModal(false)}
    >
      <Modal.Header css={{ pb: "$2" }}>
        <Text h3>Confirm plan change</Text>
      </Modal.Header>
      <Modal.Body>
        <Text
          css={{ textAlign: "center", color: "$accents8" }}
          size={14}
          weight="medium"
        >
          Are you sure you want to change your plan? Doing so will cancel your
          current pro subscription immediately.
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Row justify="center">
          <Button
            onClick={() => setConfirmationModal(false)}
            color="error"
            flat
            auto
            css={{ width: "100%" }}
          >
            Close
          </Button>
          <Spacer x={0.6} />
          <Button auto shadow css={{ width: "100%" }}>
            Confirm
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};
