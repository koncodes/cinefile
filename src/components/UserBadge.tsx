import { UserReference } from "@/entities/User";
import { Avatar, Badge, HStack, Text } from "@chakra-ui/react";

interface Props {
  user: UserReference;
}

const UserBadge = ({ user }: Props) => {
  return (
    <Badge variant="outline" size="sm" paddingRight="2.5">
      <HStack gap="1">
        <Avatar.Root
          colorPalette="brand"
          size="2xs"
          transform="scale(.75)"
          transformOrigin="center"
        >
          <Avatar.Fallback name={user.displayName} />
          <Avatar.Image src={user.avatarURL || undefined} />
        </Avatar.Root>
        <Text fontWeight={700} textTransform="uppercase" color="gray.500">
          {user.displayName}
        </Text>
      </HStack>
    </Badge>
  );
};

export default UserBadge;
