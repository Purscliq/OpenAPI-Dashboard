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
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import AttachIcon from "@/assets/svg/AttachIcon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { useFetchCountryQuery } from "@/services/country/index.service";
import {
  useCreateUploadFileMutation,
  useGetDirectorQuery,
  useUpdateDirectorMutation,
  useVerifyBvnMutation,
} from "@/services/business/index.service";
import { LoadingOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "/api/v1/business/image-upload",
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
  const router = useRouter();

  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const { data: country } = useFetchCountryQuery({});
  const { data: director, refetch } = useGetDirectorQuery({});
  const [update, { isLoading }] = useUpdateDirectorMutation();
  const [verifyBvn, { isLoading: isVerifying }] = useVerifyBvnMutation();
  const [formData, setFormData] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState(
    "https://flagcdn.com/ng.svg"
  );
  const [updatedData, setUpdatedData] = useState(data);
  const [upload_url, setUploadUrl] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target || {};

    if (name === "phone_number") {
      const formattedValue = value.startsWith("0") ? value.slice(1) : value;
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "bvn" && value?.length === 11) {
      verifyBvn({
        bvn: parseInt(value),
        first_name: formData.legal_first_name,
        last_name: formData.legal_last_name,
        dob: formData.dob,
      })
        .unwrap()
        .then((res) => {
          const validatedData = res.data.data;
          setFormData((prevState) => ({
            ...prevState,
            legal_first_name: validatedData.firstname,
            legal_last_name: validatedData.lastname,
            phone_number: validatedData.phone,
            gender: validatedData.gender,
          }));
          message.success("BVN validated successfully");
        })
        .catch((err) => {
          message.warning("Invalid BVN");
          setFormData((prevState) => ({
            ...prevState,
            bvn: "",
          }));
        });
    }
  };

  const handleCountryChange = (
    value: string,
    option: Record<string, string> | Record<string, string>[]
  ) => {
    if (!Array.isArray(option)) {
      setSelectedCountry(option?.flag);
      setFormData((prev) => ({ ...prev, nationality: value }));
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    update({
      ...formData,
      id_card_url: upload_url,
      signature_url: upload_url,
      proof_of_add_url: upload_url,
    })
      .unwrap()
      .then((res) => {
        refetch();
        message.success("Director profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating director:", error);
      });
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
    router.back();
  };
  const [createUploadFile] = useCreateUploadFileMutation();

  const handleUpload = (
    info: UploadChangeParam<UploadFile>,
    fieldName: string
  ) => {
    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      createUploadFile(formData)
        .unwrap()
        .then((res) => {
          const uploadedUrl = res.data.upload_url;
          setUploadUrl(uploadedUrl);
          setFormData((prev) => ({
            ...prev,
            [fieldName]: uploadedUrl,
          }));
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          message.error(`Failed to upload ${info.file.name}.`);
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
                  disabled={!!director?.data?.legal_first_name}
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
                  disabled={!!director?.data?.legal_last_name}
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
                required
                disabled={!!director?.data?.dob}
              />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                BVN
              </label>
              <span className="relative">
                <Input
                  max={11}
                  min={11}
                  name="bvn"
                  required
                  onChange={handleChange}
                  value={formData.bvn}
                  placeholder="BVN"
                  disabled={!!director?.data?.bvn}
                />
                {isVerifying && (
                  <div
                    // className="absolute top-[50%] right-[8px] -translate-y-[50%]"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "8px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <LoadingOutlined
                      style={{ fontSize: 22, color: "#1890ff" }}
                    />
                  </div>
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
                disabled={!!director?.data?.phone_number}
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
                disabled={!!director?.data?.gender}
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
                disabled={!!director?.data?.nationality}
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
                disabled={!!director?.data?.address}
                required
                placeholder="2,oseni close..."
              />
            </div>

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
                name="id_card_url"
                multiple
                accept="application/pdf, image/jpeg"
                action="/api/v1/business/image-upload"
                onChange={(info) => handleUpload(info, "id_card_url")}
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
                name="signature_url"
                multiple
                accept="application/pdf, image/jpeg"
                action="/api/v1/business/image-upload"
                onChange={(info) => handleUpload(info, "signature_url")}
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
                name="proof_of_add_url"
                multiple
                accept="application/pdf, image/jpeg"
                action="/api/v1/business/image-upload"
                onChange={(info) => handleUpload(info, "proof_of_add_url")}
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
