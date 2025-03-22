import useProviders from "@/hooks/useProviders";
import { useMovieQueryStore } from "@/stores/MovieQueryStore";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const ProviderSelector = () => {
  const { data: providers, error } = useProviders();
  const ChevronDownIcon = BsChevronDown as React.ElementType;

  const selectedProvider = useMovieQueryStore((s) => s.movieQuery.provider);
  const setProvider = useMovieQueryStore((s) => s.setProvider);

  if (error) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          width="100%"
          justifyContent="space-between"
        >
          {selectedProvider?.provider_name || "Select Provider"}{" "}
          <ChevronDownIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {providers?.results?.map((provider) => (
              <Menu.Item
                key={provider.provider_id}
                value={provider.provider_id.toString()}
                onClick={() => setProvider(provider)}
              >
                {provider.provider_name}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default ProviderSelector;
