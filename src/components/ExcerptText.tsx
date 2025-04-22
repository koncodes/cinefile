import { Text } from "@chakra-ui/react";

interface Props {
  children: string;
  limit?: number;
}

const ExcerptText = ({ children, limit = 100 }: Props) => {
  if (!children) return null;
  if (children.length <= limit) return <Text>{children}</Text>;

  const trimmed = children.substring(0, limit).trimEnd();

  return <>{trimmed + "..."}</>;
};

export default ExcerptText;
