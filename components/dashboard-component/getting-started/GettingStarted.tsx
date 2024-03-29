"use client";
import Activate from "./Activate";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import {
  useEnable2faMutation,
  useLazyGenerate2faQuery,
} from "@/services/auth/index.service";
import { LoadingOutlined } from "@ant-design/icons";

const GettingStarted = () => {
  const { replace } = useRouter();
  const [enabled2Fa, { isLoading: isEnabling }] = useEnable2faMutation({});
  const [generate2FA, { isLoading: isGenerating }] = useLazyGenerate2faQuery(
    {}
  );

  const handleSubmit = async () => {
    try {
      await enabled2Fa({}).unwrap();
      const res = await generate2FA({});
      const url = `/getting-started/2fa?qr=${encodeURIComponent(
        res?.data?.data?.upload_url
      )}`;

      replace(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <Activate />

      <div className="flex flex-col gap-6 md:mt-12 mt-6 max-w-4xl mx-auto">
        <div className="bg-white py-4 px-8 border border-[#E9EBEB] rounded-md shadow-sm md:flex justify-between gap-6 space-y-4 md:space-y-0">
          <span className="flex flex-col gap-2">
            <p className=" font-semibold text-[#181336]">Secure your account</p>
            <p className="text-[#515B6F] max-w-xl">
              Provide the necessary details and documents. This helps us make
              sure you comply with regulations
            </p>
          </span>
          <span className="flex items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-[#3772FF] font-semibold flex gap-4"
              disabled={isEnabling || isGenerating}
            >
              Secure Account
              {isEnabling || isGenerating ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                <GoArrowRight className="w-6 h-6" />
              )}
            </button>
          </span>
        </div>
        <div className="bg-white py-4 px-8 border border-[#E9EBEB] rounded-md shadow-sm md:flex justify-between gap-6 space-y-4 md:space-y-0">
          <span className="flex flex-col gap-2">
            <p className=" font-semibold text-[#181336]">API Documentation</p>
            <p className="text-[#515B6F] max-w-xl">
              Integrate PursFi API with our developers documentation which
              contain the libraries, APIs and SDKs
            </p>
          </span>
          <span className="flex items-center">
            <button
              type="button"
              className="text-[#3772FF] font-semibold flex gap-4"
            >
              Visit Documentation
              <GoArrowRight className="w-6 h-6" />
            </button>
          </span>
        </div>
        <div className="bg-white py-4 px-8 border border-[#E9EBEB] rounded-md shadow-sm md:flex justify-between gap-6 space-y-4 md:space-y-0">
          <span className="flex flex-col gap-2">
            <p className=" font-semibold text-[#181336]">
              Set up your preference
            </p>
            <p className="text-[#515B6F] max-w-xl">
              Setup your notifications, general fee bearer and more
            </p>
          </span>
          <span className="flex items-center">
            <button
              type="button"
              className="text-[#3772FF] font-semibold flex gap-4"
            >
              Enable
              <GoArrowRight className="w-6 h-6" />
            </button>
          </span>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
