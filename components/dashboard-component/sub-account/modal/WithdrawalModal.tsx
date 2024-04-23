import { Modal } from "antd";
import React from "react";
interface ModalProps {
  openWithdrawalModal: boolean;
  close: () => void;
}

const WithdrawalModal: React.FC<ModalProps> = ({
  openWithdrawalModal,
  close,
}) => {
  return (
    <Modal
      title="Withdrawal"
      open={openWithdrawalModal}
      onCancel={close}
      footer={null}
    >
      <p>Withdrawal modal content goes here...</p>
    </Modal>
  );
};

export default WithdrawalModal;
