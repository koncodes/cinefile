import { PropsWithChildren } from 'react'

declare module '@chakra-ui/react' {
    export interface MenuTriggerProps extends PropsWithChildren {
        asChild?: boolean;
    }
    export interface MenuItemProps extends PropsWithChildren {
        value?: string;
        onClick?: () => void;
    }
    export interface ProgressCircleCircleProps extends PropsWithChildren {
        css?: object;
    }
    export interface ProgressCircleRangeProps extends PropsWithChildren {
        strokeLinecap?: string;
        stroke?: string;
    }
}