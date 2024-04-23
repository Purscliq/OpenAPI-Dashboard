import { Modal } from 'antd'
import React from 'react'
interface FundModalProps {
  openFundsModal: boolean;
  close: () => void;
  handleOpenWithdrawalModal: () => void;
}

const FundModal: React.FC<FundModalProps> = ({ openFundsModal, close, handleOpenWithdrawalModal }) => {
  return (
       <Modal
        title="Details"
        open={openFundsModal}
        onCancel={close}
        footer={[
          <button key="withdraw" onClick={handleOpenWithdrawalModal}>
            Withdraw
          </button>,
        ]}
      >
        <p>Modal content</p>
      </Modal>
  )
}

export default FundModal