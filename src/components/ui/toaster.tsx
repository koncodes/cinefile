import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";
type ToastOptions = {
  id: string;
  type?: "loading" | "success" | "error" | "info";
  title?: string;
  description?: string;
  action?: { label: string };
  meta?: { closable?: boolean };
};

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster />
      {toaster.toasts.map((toast: ToastOptions) => (
        <Toast.Root key={toast.id} width={{ md: "sm" }}>
          {toast.type === "loading" ? (
            <Spinner size="sm" color="blue.solid" />
          ) : (
            <Toast.Indicator />
          )}
          <Stack gap="1" flex="1" maxWidth="100%">
            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
            {toast.description && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
          </Stack>
          {toast.action && (
            <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
          )}
          {toast.meta?.closable && <Toast.CloseTrigger />}
        </Toast.Root>
      ))}
    </Portal>
  );
};
