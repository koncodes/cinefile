import { useState, useEffect } from "react";
import UserCollection from "@/firebase/UserCollection";
import { Heading, Spinner, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AddListForm from "@/components/AddListForm";
import SearchMovies from "@/components/SearchMovie";
import { Movie } from "@/entities/Movie";

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
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

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box>
      <Heading>{user?.displayName}</Heading>
      <Text>Email: {user?.email}</Text>
      <Text>Avatar URL: {user?.avatarURL}</Text>
      <AddListForm />
    </Box>
  );
};

export default UserProfilePage;
