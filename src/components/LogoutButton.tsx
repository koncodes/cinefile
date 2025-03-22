import { auth } from "@/firebase";
import { userAuthStore } from "@/stores/AuthStore";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LogoutButton = () => {
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

  return (
    <Link onClick={handleLogout} to={""}>
      Logout
    </Link>
  );
};

export default LogoutButton;
