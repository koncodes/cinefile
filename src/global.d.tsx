import { ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

declare module "@chakra-ui/react" {
  export interface MenuTriggerProps extends PropsWithChildren {
    asChild?: boolean;
  }
  export interface MenuItemProps extends PropsWithChildren {
    value?: string;
    onClick?: () => void;
    asChild?: boolean;
  }
  export interface ProgressCircleCircleProps extends PropsWithChildren {
    css?: object;
  }
  export interface ProgressCircleTrackProps extends PropsWithChildren {
    stroke?: string;
  }
  export interface ProgressCircleRangeProps extends PropsWithChildren {
    strokeLinecap?: string;
    stroke?: string;
  }
  export interface PopoverTriggerProps extends PropsWithChildren {
    asChild?: boolean;
  }
  export interface DialogTriggerProps extends PropsWithChildren {
    asChild?: boolean;
  }
  export interface DialogCloseTriggerProps extends PropsWithChildren {
    asChild?: boolean;
  }
  export interface AvatarImageProps extends PropsWithChildren {
    src?: string;
  }
  interface ButtonProps extends React.ComponentProps<"button"> {
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    quaternary?: boolean;
    quinary?: boolean;
  }
  interface BadgeProps extends React.ComponentProps<"button"> {
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
  }
  export interface DialogContentProps extends PropsWithChildren {
    padding?: string;
    bg?: string;
    color?: string;
  }
  export interface SwitchLabelProps extends PropsWithChildren {
    fontSize?: string;
    fontWeight?: string;
  }
  export interface RatingGroupItemProps extends PropsWithChildren {
    key?: number;
    index?: number;
  }
  export interface ContainerProps extends PropsWithChildren {
    variant?: string;
  }
  export interface ToasterProps extends PropsWithChildren {
    children?: React.ReactNode | any;
    toaster?: any;
    insetInline?: object;
  }
  export interface SelectItemProps extends PropsWithChildren {
    value?: string;
  }
  export interface SelectValueTextProps extends PropsWithChildren {
    placeholder?: string;
  }
  export interface FileUploadDropzoneProps extends PropsWithChildren {
    borderWidth?: string;
    borderColor?: string;
    borderStyle?: string;
    borderRadius?: string;
    bg?: string;
  }
  export interface AvatarImageProps extends PropsWithChildren {
    borderEndRadius?: string;
  }
}
