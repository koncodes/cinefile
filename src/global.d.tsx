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
  }
}
