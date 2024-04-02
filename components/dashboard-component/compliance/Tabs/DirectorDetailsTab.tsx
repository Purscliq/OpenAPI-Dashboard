import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import {
  CustomInput as Input,
  CustomDatePicker as DatePicker,
} from "@/lib/AntdComponents";
import { Select } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import AttachIcon from "@/assets/svg/AttachIcon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { useFetchCountryQuery } from "@/services/country/index.service";
import {
  useGetDirectorQuery,
  useUpdateDirectorMutation,
  useVerifyBvnMutation,
} from "@/services/business/index.service";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const data = {
  bvn: "",
  legal_first_name: "",
  legal_last_name: "",
  phone_number: "",
  gender: "",
  dob: "",
  nationality: "Nigeria",
  address: "",
  id_card_url: "",
  signature_url: "",
  proof_of_add_url: "",
};
const DirectorDetailsTab = () => {
  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const { data: country } = useFetchCountryQuery({});
  const { data: director, refetch } = useGetDirectorQuery({});
  const [update, { isLoading }] = useUpdateDirectorMutation();
  const [verifyBvn, { isLoading: isVerifying }] = useVerifyBvnMutation();

  const [bvnError, setBvnError] = useState("");
  const [formData, setFormData] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState(
    "https://flagcdn.com/ng.svg"
  );
  const [updatedData, setUpdatedData] = useState(data);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
    if (e.target?.name === "bvn") {
      if (e.target?.value?.length === 11) {
        verifyBvn({
          bvn: parseInt(e.target.value),
          first_name: formData.legal_first_name,
          last_name: formData.legal_last_name,
          dob: formData.dob,
        })
          .then((res) => {
            message.success("BVN verified successfully ");
            console.log(res);
          })
          .catch((err) => {
            message.error("Issue verifying BVN");
            console.log(err);
          });
      } else {
        setBvnError("BVN must be exactly 11 digits");
      }
    }
  };

  const handleCountryChange = (
    value: string,
    option: Record<string, string> | Record<string, string>[]
  ) => {
    if (!Array.isArray(option)) {
      setSelectedCountry(option?.flag);
      setFormData((prev) => ({ ...prev, nationality: option?.name }));
    }
  };

  const isFormFilled = () => {
    return (
      formData.bvn &&
      formData.legal_first_name &&
      formData.legal_last_name &&
      formData.phone_number &&
      formData.gender &&
      formData.dob &&
      formData.nationality &&
      formData.address
    );
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!bvnError && isFormFilled()) {
      console.log(formData);
      update(formData)
        .unwrap()
        .then((res) => {
          refetch();
          message.success("Dieector profile updated successfully");
        })
        .catch((error) => {
          console.error("Error updating business:", error);
        });
    }
  };

  useEffect(() => {
    if (director?.data) {
      setFormData({
        ...director.data,
      });
      setUpdatedData({
        ...director.data,
      });
    }
  }, [director]);

  const handleCancel = () => {
    if (updatedData) {
      setFormData({
        ...updatedData,
      });
    } else {
      setFormData({
        bvn: "",
        legal_first_name: "",
        legal_last_name: "",
        phone_number: "",
        gender: "",
        dob: "",
        nationality: "Nigeria",
        address: "",
        id_card_url: "",
        signature_url: "",
        proof_of_add_url: "",
      });
    }
  };

  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
        <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
          <p className="font-semibold text-base">Tell us about yourself</p>
          <p className="font-normal text-base">
            This must be the name on your registration Documentation.
          </p>
        </div>

        <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
            <div className="flex items-center justify-between gap-[1rem]">
              <span className="w-full">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Legal First name
                </label>
                <Input
                  value={formData.legal_first_name}
                  onChange={handleChange}
                  name="legal_first_name"
                  required
                  placeholder="First Name"
                  className="!w-full"
                />
              </span>
              <span className="w-full">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Legal Last name
                </label>
                <Input
                  value={formData.legal_last_name}
                  onChange={handleChange}
                  name="legal_last_name"
                  required
                  placeholder="Last Name"
                  className="!w-full"
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Date of Birth
              </label>
              <DatePicker
                onChange={(value, date) =>
                  setFormData((prev) => ({
                    ...prev,
                    dob: `${date}`,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                BVN
              </label>
              <span>
                <Input
                  max={11}
                  min={11}
                  name="bvn"
                  required
                  onChange={handleChange}
                  value={formData.bvn}
                  placeholder="BVN"
                />
                {bvnError && (
                  <p className="text-red-500 text-[14px] font-[400]">
                    {bvnError}
                  </p>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone Number
              </label>
              <PhoneInput
                country={"ng"}
                containerClass="!w-full"
                inputClass="phone-input-input !w-full !disabled:text-gray-700 !"
                value={formData.phone_number}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone_number: value }))
                }
              />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Gender
              </label>
              <Select
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
                value={formData.gender}
                options={gender}
              />
            </div>
            
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nationality
              </label>
              <Select
                showSearch
                placeholder="Select a country"
                value={formData.nationality}
                optionFilterProp="value"
                onChange={handleCountryChange}
                style={{ width: "100%" }}
                options={country}
                defaultValue={"Nigeria"}
                suffixIcon={
                  <Image
                    src={selectedCountry}
                    alt="flag"
                    width={40}
                    height={45}
                    className="border"
                  />
                }
              />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Residential Address
              </label>
              <Input
                value={formData.address}
                name="address"
                onChange={handleChange}
                required
                placeholder="2,oseni close..."
              />
            </div>

            {/* upload
            <Dragger
              {...props}
              className="flex flex-col items-center  gap-[0.3rem]"
            >
              <span className="ant-upload-drag-icon mx-auto">
                <ImageIcon />
              </span>
              <p className="ant-upload-text">
                <b className="font-semibold">Click to replace</b> or drag and
                drop
              </p>
              <p className="ant-upload-hint">
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </Dragger> */}

            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="IDCard"
                className="block text-sm font-semibold text-gray-700"
              >
                ID Card (Govt Issued)
              </label>

              <Dragger
                {...props}
                id="IDCard"
                className="flex items-center text-center  gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document
                </p>
              </Dragger>
            </div>

            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="signature"
                className="block text-sm font-semibold text-gray-700"
              >
                Signature
              </label>
              <Dragger
                {...props}
                id="signature"
                className="flex items-center text-center  gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document
                </p>
              </Dragger>
            </div>

            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="ProofOfAddress"
                className="block text-sm font-semibold text-gray-700"
              >
                Proof of address
              </label>
              <Dragger
                {...props}
                id="ProofOfAddress"
                className="flex items-center text-center gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document
                </p>
              </Dragger>
            </div>

            <div className="">
              <div className="flex justify-between gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full text-center text-md rounded-md px-4 py-2 font-medium text-black focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DirectorDetailsTab;


// import React, {
//   ChangeEventHandler,
//   FormEventHandler,
//   useEffect,
//   useState,
// } from "react";
// import {
//   CustomInput as Input,
//   CustomDatePicker as DatePicker,
// } from "@/lib/AntdComponents";
// import { Select } from "antd";
// import type { UploadProps } from "antd";
// import { message, Upload } from "antd";
// import AttachIcon from "@/assets/svg/AttachIcon";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import Image from "next/image";
// import { useFetchCountryQuery } from "@/services/country/index.service";
// import {
//   useGetDirectorQuery,
//   useUpdateDirectorMutation,
//   useVerifyBvnMutation,
// } from "@/services/business/index.service";
// import { LoadingOutlined } from "@ant-design/icons";

// const { Dragger } = Upload;

// const props: UploadProps = {
//   name: "file",
//   multiple: true,
//   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };

// const data = {
//   bvn: "",
//   legal_first_name: "",
//   legal_last_name: "",
//   phone_number: "",
//   gender: "",
//   dob: "",
//   nationality: "Nigeria",
//   address: "",
//   id_card_url: "",
//   signature_url: "",
//   proof_of_add_url: "",
// };
// const DirectorDetailsTab = () => {
//   const gender = [
//     { label: "Male", value: "Male" },
//     { label: "Female", value: "Female" },
//   ];
//   const { data: country } = useFetchCountryQuery({});
//   const { data: director, refetch } = useGetDirectorQuery({});
//   const [update, { isLoading }] = useUpdateDirectorMutation();
//   const [verifyBvn, { isLoading: isVerifying }] = useVerifyBvnMutation();

//   const [bvnError, setBvnError] = useState("");
//   const [formData, setFormData] = useState(data);
//   const [selectedCountry, setSelectedCountry] = useState(
//     "https://flagcdn.com/ng.svg"
//   );
//   // const [updatedData, setUpdatedData] = useState(data);

//   const handleChange: ChangeEventHandler<
//     HTMLInputElement | HTMLTextAreaElement
//   > = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target?.name]: e.target?.value,
//     }));
//     if (e.target?.name === "bvn") {
//       if (e.target?.value?.length === 11) {
//         verifyBvn({
//           bvn: parseInt(e.target.value),
//           first_name: formData.legal_first_name,
//           last_name: formData.legal_last_name,
//           dob: formData.dob,
//         })
//           .then((res) => {
//             message.success("BVN verified successfully ");
//           })
//           .catch((err) => {
//             message.error("Issue verifying BVN");
//           });
//       } else {
//         setBvnError("BVN must be exactly 11 digits");
//       }
//     }
//   };

//   const handleCountryChange = (
//     value: string,
//     option: Record<string, string> | Record<string, string>[]
//   ) => {
//     if (!Array.isArray(option)) {
//       setSelectedCountry(option?.flag);
//       setFormData((prev) => ({ ...prev, nationality: option?.name }));
//     }
//   };

//   const isFormFilled = () => {
//     return (
//       formData.bvn &&
//       formData.legal_first_name &&
//       formData.legal_last_name &&
//       formData.phone_number &&
//       formData.gender &&
//       formData.dob &&
//       formData.nationality &&
//       formData.address
//     );
//   };
//   const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
//     e.preventDefault();
//     if ( isFormFilled()) {
//       console.log(formData);
//       update(formData)
//         .unwrap()
//         .then((res) => {
//           refetch();
//           message.success("Dieector profile updated successfully");
//         })
//         .catch((error) => {
//           console.error("Error updating business:", error);
//         });
//     }
//   };

//   useEffect(() => {
//     if (director?.data) {
//       setFormData({
//         ...director.data,
//       });
//       setUpdatedData({
//         ...director.data,
//       });
//     }
//   }, [director]);

//   const handleCancel = () => {
//     if (updatedData) {
//       setFormData({
//         ...updatedData,
//       });
//     } else {
//       setFormData({
//         bvn: "",
//         legal_first_name: "",
//         legal_last_name: "",
//         phone_number: "",
//         gender: "",
//         dob: "",
//         nationality: "Nigeria",
//         address: "",
//         id_card_url: "",
//         signature_url: "",
//         proof_of_add_url: "",
//       });
//     }
//   };

//   return (
//     <section className="bg-white py-4 px-4 space-y-4">
//       <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
//         <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
//           <p className="font-semibold text-base">Tell us about yourself</p>
//           <p className="font-normal text-base">
//             This must be the name on your registration Documentation.
//           </p>
//         </div>

//         <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
//             <div className="flex items-center justify-between gap-[1rem]">
//               <span className="w-full">
//                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                   Legal First name
//                 </label>
//                 <Input
//                   value={formData.legal_first_name}
//                   disabled={!!director?.data?.legal_first_name}
//                   onChange={handleChange}
//                   name="legal_first_name"
//                   required
//                   placeholder="First Name"
//                   className="!w-full"
//                 />
//               </span>
//               <span className="w-full">
//                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                   Legal Last name
//                 </label>
//                 <Input
//                   value={formData.legal_last_name}
//                   onChange={handleChange}
//                   name="legal_last_name"
//                   required
//                   placeholder="Last Name"
//                   disabled={!!director?.data?.legal_last_name}
//                   className="!w-full"
//                 />
//               </span>
//             </div>
//             <div className="flex flex-col gap-[0.1rem]">
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Date of Birth
//               </label>
//               <DatePicker
//                 disabled={!!director?.data?.dob}
//                 onChange={(value, date) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     dob: `${date}`,
//                   }))
//                 }
//               />
//             </div>
//             <div className="flex flex-col gap-[0.1rem]">
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 BVN
//               </label>
//               <div>
//                 <span style={{ position: "relative" }}>
//                   <Input
//                     max={11}
//                     min={11}
//                     name="bvn"
//                     required
//                     onChange={handleChange}
//                     value={formData.bvn}
//                     placeholder="BVN"
//                     disabled={!!director?.data?.bvn}
//                   />
//                   {isVerifying && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "50%",
//                         right: "8px",
//                         transform: "translateY(-50%)",
//                       }}
//                     >
//                       <LoadingOutlined
//                         style={{ fontSize: 22, color: "#1890ff" }}
//                       />
//                     </div>
//                   )}
//                 </span>
//                 {bvnError && (
//                   <p className="text-blue-700 pt-2 text-[14px] font-[400]">
//                     {bvnError}
//                   </p>
//                 )}
//               </div>{" "}
//             </div>
//             <div className="flex flex-col gap-[0.1rem]">
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Phone Number
//               </label>
//               <PhoneInput
//                 country={"ng"}
//                 containerClass="!w-full"
//                 inputClass="phone-input-input !w-full !disabled:text-gray-700 !"
//                 value={formData.phone_number}
//                 onChange={(value) =>
//                   setFormData((prev) => ({ ...prev, phone_number: value }))
//                 }
//               />
//             </div>
//             <div className="flex flex-col gap-[0.1rem]">
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Gender
//               </label>
//               <Select
//                 onChange={(value) =>
//                   setFormData((prev) => ({ ...prev, gender: value }))
//                 }
//                 value={formData.gender}
//                 options={gender}
//                 disabled={!!director?.data?.gender}
//               />
//             </div>

//             <div className="flex flex-col gap-[0.1rem]">
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Nationality
//               </label>
//               <Select
//                 showSearch
//                 placeholder="Select a country"
//                 value={formData.nationality}
//                 disabled={!!director?.data?.nationality}
//                 optionFilterProp="value"
//                 onChange={handleCountryChange}
//                 style={{ width: "100%" }}
//                 options={country}
//                 defaultValue={"Nigeria"}
//                 suffixIcon={
//                   <Image
//                     src={selectedCountry}
//                     alt="flag"
//                     width={40}
//                     height={45}
//                     className="border"
//                   />
//                 }
//               />
//             </div>
//             <div className="flex flex-col gap-[0.1rem]">
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Residential Address
//               </label>
//               <Input
//                 value={formData.address}
//                 name="address"
//                 disabled={!!director?.data?.address}
//                 onChange={handleChange}
//                 required
//                 placeholder="2,oseni close..."
//               />
//             </div>

//             {/* upload
//             <Dragger
//               {...props}
//               className="flex flex-col items-center  gap-[0.3rem]"
//             >
//               <span className="ant-upload-drag-icon mx-auto">
//                 <ImageIcon />
//               </span>
//               <p className="ant-upload-text">
//                 <b className="font-semibold">Click to replace</b> or drag and
//                 drop
//               </p>
//               <p className="ant-upload-hint">
//                 SVG, PNG, JPG or GIF (max. 400 x 400px)
//               </p>
//             </Dragger> */}

//             <div className="flex flex-col gap-[0.3rem]">
//               <label
//                 htmlFor="IDCard"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 ID Card (Govt Issued)
//               </label>

//               <Dragger
//                 {...props}
//                 id="IDCard"
//                 className="flex items-center text-center  gap-[0.3rem]"
//               >
//                 <p className="ant-upload-text flex gap-4">
//                   <AttachIcon />
//                   Attach Document
//                 </p>
//               </Dragger>
//             </div>

//             <div className="flex flex-col gap-[0.3rem]">
//               <label
//                 htmlFor="signature"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Signature
//               </label>
//               <Dragger
//                 {...props}
//                 id="signature"
//                 className="flex items-center text-center  gap-[0.3rem]"
//               >
//                 <p className="ant-upload-text flex gap-4">
//                   <AttachIcon />
//                   Attach Document
//                 </p>
//               </Dragger>
//             </div>

//             <div className="flex flex-col gap-[0.3rem]">
//               <label
//                 htmlFor="ProofOfAddress"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Proof of address
//               </label>
//               <Dragger
//                 {...props}
//                 id="ProofOfAddress"
//                 className="flex items-center text-center gap-[0.3rem]"
//               >
//                 <p className="ant-upload-text flex gap-4">
//                   <AttachIcon />
//                   Attach Document
//                 </p>
//               </Dragger>
//             </div>

//             <div className="">
//               <div className="flex justify-between gap-4 mt-8">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
//                 >
//                   {isLoading ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="w-full text-center text-md rounded-md px-4 py-2 font-medium text-black focus:outline-none"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DirectorDetailsTab;
