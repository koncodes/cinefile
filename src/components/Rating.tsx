import {
  AbsoluteCenter,
  HStack,
  ProgressCircle,
  Text,
  FormatNumber,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

interface Props {
  score: number;
}

const Rating = ({ score }: Props) => {
  const green = useColorModeValue("green.500", "green.400");
  const yellow = useColorModeValue("yellow.400", "yellow.200");
  const track = useColorModeValue("brand.gray.400", "brand.gray.600");
  const grayColor = useColorModeValue("brand.gray.600", "brand.gray.400");

  const color = score > 7.5 ? green : score > 6.0 ? yellow : grayColor;

  return (
    <ProgressCircle.Root
      size="md"
      value={score * 10}
      width="min-content"
      transform="scale(.85)"
      transformOrigin="center"
    >
      <ProgressCircle.Circle css={{ "--thickness": "3px" }}>
        <ProgressCircle.Track stroke={track} />
        <ProgressCircle.Range strokeLinecap="round" stroke={color} />
      </ProgressCircle.Circle>
      <AbsoluteCenter>
        <HStack gap="0" fontSize="1.2em" paddingTop="1px">
          <Text fontWeight="bold">
            {" "}
            <FormatNumber value={score * 10} maximumFractionDigits={0} />
          </Text>
          <Text as="sup" top="-2px" fontSize=".6em">
            %
          </Text>
        </HStack>
      </AbsoluteCenter>
    </ProgressCircle.Root>
  );
};

export default Rating;
