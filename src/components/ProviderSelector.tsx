import { Button, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import useProviders, { Provider } from '@/hooks/useProviders';

interface Props {
  onSelectProvider: (provider: Provider) => void;
  selectedProvider: Provider | null;
}

const ChevronDownIcon = BsChevronDown as React.ElementType;

const ProviderSelector = ({ selectedProvider, onSelectProvider }: Props) => {
  const { data: providers, error } = useProviders();

  if (error) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {selectedProvider?.provider_name || 'Select Provider'} <ChevronDownIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            {providers.map((provider) => (
              <Menu.Item
                key={provider.provider_id}
                value={provider.provider_id.toString()}
                onClick={() => onSelectProvider(provider)}
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