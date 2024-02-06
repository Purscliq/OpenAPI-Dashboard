"use client";
import {
  ConfigProvider,
  Button,
  ButtonProps,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Radio,
  RadioProps,
  RadioGroupProps,
  Tabs,
  TabsProps,
  Upload,
  UploadProps,
  Select,
  SelectProps,
  DatePicker,
  DatePickerProps,
  Checkbox,
  CheckboxProps,
  Table,
  TableProps,
  MenuProps,
  Menu,
  TimePicker,
  TimePickerProps,
  Switch,
  SwitchProps,
  Spin,
  SpinProps,
  Tooltip,
  TooltipProps,
  Modal,
  ModalProps,
  SegmentedProps,
  Segmented,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { Archivo } from "next/font/google";
import React from "react";
const archivo = Archivo({ subsets: ["latin"] });
const primaryConfig = {
  fontFamily: archivo.style.fontFamily,
  colorPrimary: "#000000",
};

export const CustomButton = ({ ...props }: ButtonProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig, borderRadius: 5 } }}>
    <Button {...props} />
  </ConfigProvider>
);
export const CustomPasswordInput = ({ ...props }: InputProps) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
      },
    }}
  >
    <Input.Password {...props} />
  </ConfigProvider>
);

export const CustomInput = ({ ...props }: InputProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
    }}
  >
    <Input {...props} />
  </ConfigProvider>
);
export const CustomInputNumber = ({ ...props }: InputNumberProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
    }}
  >
    <InputNumber controls={false} {...props} />
  </ConfigProvider>
);
export const CustomText = ({ ...props }: TextAreaProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
    }}
  >
    <Input.TextArea {...props} />
  </ConfigProvider>
);
export const CustomRadio = ({ ...props }: RadioProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Radio {...props} />
  </ConfigProvider>
);
export const CustomRadioGroup = ({ ...props }: RadioGroupProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Radio.Group {...props} />
  </ConfigProvider>
);
export const CustomUpload = ({ ...props }: UploadProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Upload {...props} />
  </ConfigProvider>
);

export const CustomSelect = ({ ...props }: SelectProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Select {...props} />
  </ConfigProvider>
);

export const CustomDatePicker = ({ ...props }: DatePickerProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <DatePicker {...props} />
  </ConfigProvider>
);

export const CustomTimePicker = ({ ...props }: TimePickerProps) => (
  <ConfigProvider>
    <TimePicker {...props} />
  </ConfigProvider>
);

export const CustomCheckBox = ({ ...props }: CheckboxProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Checkbox {...props} />
  </ConfigProvider>
);

export const ThemeRadioGroup = ({ ...props }: RadioGroupProps) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
        borderRadius: 5,
      },
      components: {
        Radio: {
          buttonBg: "transparent",
          buttonCheckedBg: "rgb(0, 0, 0,0.5)",
          buttonSolidCheckedColor: "rgb(0, 0, 0,0.5)",
          colorBorder: "rgb(0, 0, 0,0.1)",
        },
      },
    }}
  >
    <Radio.Group
      {...props}
      style={{
        borderRadius: 8,
        textAlign: "center",
      }}
    />
  </ConfigProvider>
);

export const ThemeRadioButton = ({ ...props }: RadioProps) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
        borderRadius: 5,
      },
      components: {
        Radio: {
          buttonCheckedBg: "rgb(0, 0, 0,0.5)",
          buttonSolidCheckedColor: "rgb(0, 0, 0,0.5)",
          colorBorder: "rgb(0, 0, 0,0.1)",
        },
      },
    }}
  >
    <Radio.Button
      {...props}
      style={{
        borderRadius: 8,
        textAlign: "center",
        color: "#000",
        width: "100%",
        ...props.style,
      }}
    />
  </ConfigProvider>
);

export const CustomTable = ({ ...props }: TableProps<any>) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
        borderRadius: 5,
      },
    }}
  >
    <Table {...props} />
  </ConfigProvider>
);

export const CustomMenu = ({ ...props }: MenuProps) => (
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 5,
        fontSize: 14,
        ...primaryConfig,
        colorPrimaryBg: "#E6E6E6",
        colorBgTextActive: "#515B6F",
      },
    }}
  >
    <Menu {...props} />
  </ConfigProvider>
);
const secConfig = {
  fontFamily: archivo.style.fontFamily,
  colorPrimary: "#0000",
};
export const CustomTabs = ({ ...props }: TabsProps) => (
  <ConfigProvider
    theme={{
      token: { ...secConfig },
      components: {
        Tabs: {
          itemSelectedColor: "#000000",
          colorLinkActive: "#000000", 
          itemColor: "#515B6F",
          fontSize: 16,
          fontWeightStrong: 600,
        },
      },
    }}
  >
    <Tabs {...props} />
  </ConfigProvider>
);

export const CustomSegment = (
  { ...props }: SegmentedProps,
  ref: React.Ref<HTMLDivElement>
) => (
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 5,
        fontSize: 16,
        // ...primaryConfig, // Assuming primaryConfig is defined elsewhere
      },
      components: {
        Segmented: {
          trackBg: "#F3F8EA",
          trackPadding: 6,
          borderRadius: 20,
          padding: 4,
        },
      },
    }}
  >
    <Segmented {...props} ref={ref} />
  </ConfigProvider>
);

const ForwardedCustomSegment = React.forwardRef<HTMLDivElement, SegmentedProps>(
  CustomSegment
);

export default ForwardedCustomSegment;

export const CustomSwitch = ({ ...props }: SwitchProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Switch {...props} />
  </ConfigProvider>
);

export const CustomSpinner = ({ ...props }: SpinProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Spin {...props} />
  </ConfigProvider>
);

export const CustomTooltip = ({ ...props }: TooltipProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Tooltip {...props} />
  </ConfigProvider>
);

export const CustomModal = ({ ...props }: ModalProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Modal {...props} />
  </ConfigProvider>
);
