import { User } from "@/entities/User";
import UserCollection from "@/firebase/UserCollection";
import { userAuthStore } from "@/stores/AuthStore";
import {
  HStack,
  Avatar,
  VStack,
  Heading,
  Span,
  Badge,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const UserProfileHeader = () => {
  const { id } = useParams();
  const authUser = userAuthStore((s) => s.authUser);
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserCollection.getUser(id!);
        if (userData && userData.exists()) {
          setUser(userData);
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      <HStack gap="5" alignItems="flex-start">
        <Avatar.Root colorPalette="brand" size="2xl" marginTop="2">
          <Avatar.Fallback name={user?.displayName} />
          <Avatar.Image src={user?.avatarURL || undefined} />
        </Avatar.Root>
        <VStack alignItems="flex-start">
          <Heading as="h1" size="4xl">
            {user?.displayName}
          </Heading>
          <Span>{user?.email}</Span>
        </VStack>
      </HStack>
      <HStack
        py="3"
        px="3.5"
        my="5"
        border="1px"
        borderColor="border.card"
        borderStyle="solid"
        borderRadius="md"
      >
        <Link to={"/users/" + user?.id}>
          <Span
            style={{
              fontWeight: isActive("/users/" + user?.id) ? "bold" : "normal",
            }}
          >
            Profile
          </Span>
        </Link>
        {" • "}
        <Link to={"/users/" + user?.id + "/reviews"}>
          <Span
            style={{
              fontWeight: isActive("/users/" + user?.id + "/reviews")
                ? "bold"
                : "normal",
            }}
          >
            Reviews
          </Span>
        </Link>
        {" • "}
        <Link to={"/users/" + user?.id + "/watchlist"}>
          <Span
            style={{
              fontWeight: isActive("/users/" + user?.id + "/watchlist")
                ? "bold"
                : "normal",
            }}
          >
            Watchlist
          </Span>
        </Link>
        {" • "}
        <Link to={"/users/" + user?.id + "/lists"}>
          <Span
            style={{
              fontWeight: isActive("/users/" + user?.id + "/lists")
                ? "bold"
                : "normal",
            }}
          >
            Lists
          </Span>
        </Link>
        {authUser?.id === user?.id && (
          <Link to="/settings" style={{ marginLeft: "auto" }}>
            <Badge variant="outline" size="md">
              Edit Profile
            </Badge>
          </Link>
        )}
      </HStack>
    </>
  );
};

export default UserProfileHeader;
