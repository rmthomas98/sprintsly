import { Button, Modal, Text, Row, Spacer, Loading } from "@nextui-org/react";

export const PlanModal = ({
  periodEndModal,
  setPeriodEndModal,
  periodEndLoading,
  handlePeriodEnd,
  periodEnd,
}: any) => {
  return (
    <Modal
      onClose={() => setPeriodEndModal(false)}
      open={periodEndModal}
      css={{ py: "$6" }}
    >
      <Modal.Header css={{ pb: "$2" }}>
        <Text h3>{periodEnd ? "Cancel plan" : "Renew plan"}</Text>
      </Modal.Header>
      <Modal.Body>
        <Text
          css={{ textAlign: "center", color: "$accents8" }}
          size={14}
          weight="medium"
        >
          {periodEnd
            ? "Are you sure you want to cancel your plan? Current features will be accessible until the end of the billing period."
            : "Are you sure you want to renew your plan? You will continue to be billed monthly."}
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Row justify="flex-end">
          <Button
            onClick={() => setPeriodEndModal(false)}
            color="error"
            flat
            auto
            css={{ width: "100%" }}
          >
            Close
          </Button>
          <Spacer x={0.6} />
          <Button
            auto
            shadow
            css={{ width: "100%" }}
            onClick={() => handlePeriodEnd(periodEnd)}
            disabled={periodEndLoading}
          >
            {periodEndLoading ? <Loading size="xs" /> : "Confirm"}
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};
