import { Button, Text } from "@chakra-ui/react";
import { limit } from "firebase/firestore";
import React, { useState } from "react";

interface Props {
  children: string;
  limit?: number;
}

const ExpandableText = ({ children, limit = 100 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!children) return null;

  if (children.length <= limit) return <div>{children}</div>;

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <Text>
      {summary}
      <Button
        size="xs"
        fontWeight="bold"
        marginLeft={1}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
