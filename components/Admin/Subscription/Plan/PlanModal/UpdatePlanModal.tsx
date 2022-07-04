import { Modal, Text, Button } from "@nextui-org/react";

export const UpdatePlanModal = ({
  updatePlanModal,
  setUpdatePlanModal,
}: any) => {
  return (
    <Modal open={updatePlanModal} onClose={() => setUpdatePlanModal(false)}>
      <Modal.Header>
        <Text h3>Change your plan</Text>
      </Modal.Header>
    </Modal>
  );
};
