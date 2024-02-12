import { Button, Modal } from "antd";
import { CustomInput as Input } from "@/lib/AntdComponents";
const AccountModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  return (
    <Modal open={open} onCancel={setOpen} footer={null}>
      <div className="flex  justify-center items-center flex-col">
        <h2 className="text-2xl font-semibold mb-1">Create Sub Account</h2>
        <p className="text-gray-400 text-lg">
          Enter the details for this sub-account
        </p>
      </div>
      <form className="w-full space-y-4 mt-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="account"
          >
            Sub-account name
          </label>
          <Input
            name="account"
            required
            id="text"
            type="text"
            placeholder="account name"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="account"
          >
            Select Account
          </label>
          <Input
            name="account"
            required
            id="text"
            type="text"
            placeholder="account"
          />
        </div>
        <Button className="!h-[3rem] !bg-black w-full !text-white hover:!text-white">
          Create Account
        </Button>
      </form>
    </Modal>
  );
};

export default AccountModal;
