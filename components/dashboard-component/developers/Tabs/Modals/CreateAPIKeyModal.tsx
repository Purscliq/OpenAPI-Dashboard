"use client";
import React, { useState } from "react";
import { CustomInput, CustomModal as Modal } from "@/lib/AntdComponents";
import { message } from "antd";
import { useCreateApiKeyMutation } from "@/services/apikeys/index.service";
import { useGetServicesQuery } from "@/services/business/index.service";

const CreateAPIKeyModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [validity, setValidity] = useState("");
  const [service, setService] = useState("");
  const [sourceIP, setSourceIP] = useState("");
  const [createApiKey, { isLoading }] = useCreateApiKeyMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the mutation hook with the input values
      const response = await createApiKey({
        name,
        permission_payload: [
          {
            service: "loan service",
            models_permission: [
              {
                model: "transactions",
                permissions: ["read", "create"],
              },
            ],
          },
        ],
      });

      if ("data" in response) {
        // Check if the API key creation was successful
        if (response.data.status === "success") {
          message.success("API key created successfully");
          setIsModalOpen(false);
        } else {
          message.error(response.data.error.message || "An error occurred");
        }
      } else {
        message.error("An error occurred. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error creating API key:", error);
      message.error(error?.message || "An error occurred");
    }
  };

  return (
    <>
      <button
        type="button"
        className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
        onClick={showModal}
      >
        Create API Key
      </button>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="py-6">
          <div className="border-b pb-1">
            <h1 className="font-bold text-[#242F57] text-[32px] text-center">
              Create new API Key
            </h1>
            <p className="text-[#515B6F] text-base text-center">
              Enter the following details to create a new API key
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-[#25324B] text-base font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="service"
                className="text-[#25324B] text-base font-semibold"
              >
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              >
                <option value="">Select a service</option>
                <option value="Service1">Service1</option>
                <option value="Service2">Service2</option>
              </select>
            </div>
            {/* <div className="space-y-1">
              <label
                htmlFor="validity"
                className="text-[#25324B] text-base font-semibold"
              >
                Validity
              </label>
              <select
                id="validity"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              >
                <option value="">Select a validity period</option>
                <option value="Time1">Time1</option>
                <option value="Time2">Time2</option>
              </select>
            </div> */}
            <div className="space-y-1">
              <label
                htmlFor="sourceIP"
                className="text-[#25324B] text-base font-semibold"
              >
                Source IP Address(es) (Optional)
              </label>
              <input
                id="sourceIP"
                type="text"
                placeholder="192-168.1.1"
                value={sourceIP}
                onChange={(e) => setSourceIP(e.target.value)}
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-[0.25rem] w-full md:w-max px-6 py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateAPIKeyModal;

// import React, { useState } from "react";
// import { CustomInput, CustomModal as Modal } from "@/lib/AntdComponents";
// import { useCreateApiKeyMutation } from "@/services/auth/index.service";

// const CreateAPIKeyModal: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <button
//         type="button"
//         className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
//         onClick={showModal}
//       >
//         Create API Key
//       </button>

//       <Modal
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <div className="py-6">
//           <div className="border-b pb-1">
//             <h1 className="font-bold text-[#242F57] text-[32px] text-center">
//               Create new API Key
//             </h1>
//             <p className="text-[#515B6F] text-base text-center">
//               Enter the following details to create a new API key
//             </p>
//           </div>
//           <form className="mt-8 space-y-6">
//             <div className="space-y-1">
//               <label
//                 htmlFor="name"
//                 className="text-[#25324B] text-base font-semibold"
//               >
//                 Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="John Doe"
//                 required
//                 className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
//               />
//             </div>
//             <div className="space-y-1">
//               <label
//                 htmlFor="validity"
//                 className="text-[#25324B] text-base font-semibold"
//               >
//                 Validity
//               </label>
//               <select
//                 id="validity"
//                 required
//                 className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
//               >
//                 <option value="">Select a validity period</option>
//                 <option value="Time1">Time1</option>
//                 <option value="Time2">Time2</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label
//                 htmlFor="sourceIP"
//                 className="text-[#25324B] text-base font-semibold"
//               >
//                 Source IP Address(es) (Optional)
//               </label>
//               <input
//                 id="sourceIP"
//                 type="text"
//                 placeholder="192-168.1.1"
//                 required
//                 className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-black text-white rounded-[0.25rem] w-full md:w-max px-6 py-3 text-base"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default CreateAPIKeyModal;
