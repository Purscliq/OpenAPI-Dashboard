import { Button, Modal, message } from "antd";
import { useState } from "react";
import { CustomInput as Input } from "@/lib/AntdComponents";
import { useCreateSubaccountMutation } from "@/services/business/index.service";

const AccountModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const [subaccountName, setSubaccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [createSubaccount, { isLoading }] = useCreateSubaccountMutation();

  const handleCreateAccount = () => {
    setLoading(true);
    createSubaccount({ account_name: subaccountName })
      .then((res) => {
        console.log("Subaccount created:", res);
        console.log(subaccountName)
        setSubaccountName("");
      })
      .catch((error) => {
        message.error("Maximum subaccount reached" || error?.message);
      });
  };
  return (
    <Modal open={open} onCancel={setOpen} footer={null}>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-2xl font-semibold mb-1">Create Sub Account</h2>
        <p className="text-gray-400 text-lg">
          Enter the details for this sub-account
        </p>
      </div>
      <form
        className="w-full space-y-4 mt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label
            htmlFor="subaccount-name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Sub-account name
          </label>
          <Input
            id="subaccount-name"
            type="text"
            placeholder="Enter sub-account name"
            value={subaccountName}
            onChange={(e) => setSubaccountName(e.target.value)}
            required
          />
        </div>
        <Button
          className="!h-[3rem] !bg-black w-full !text-white hover:!text-white"
          onClick={handleCreateAccount}
          disabled={loading || !subaccountName.trim()}
        >
          {isLoading ? "Creating..." : "Create Account"}
        </Button>
      </form>
    </Modal>
  );
};

export default AccountModal;
