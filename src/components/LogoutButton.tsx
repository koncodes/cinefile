import { auth } from "@/firebase";
import { userAuthStore } from "@/stores/AuthStore";
import { Badge, Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const setAuthUser = userAuthStore((s) => s.setAuthUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return handleLogout;
};

export const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button
      onClick={handleLogout}
      variant="plain"
      padding="0"
      margin="0"
      h="auto"
      fontWeight="400"
      w="100%"
      justifyContent="flex-start"
    >
      Logout
    </Button>
  );
};

export const LogoutBadge = () => {
  const handleLogout = useLogout();

  return (
    <Badge primary onClick={handleLogout}>
      <Link to={"/"}>Log Out</Link>
    </Badge>
  );
};

export default LogoutButton;
