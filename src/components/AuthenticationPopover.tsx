import { User } from "@/entities/User";
import { auth } from "@/firebase";
import UserCollection from "@/firebase/UserCollection";
import { userAuthStore } from "@/stores/AuthStore";
import {
  Box,
  Button,
  Field,
  Input,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationPopover = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authUser = userAuthStore((s) => s.authUser);
  const setAuthUser = userAuthStore((s) => s.setAuthUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      const user = userCredential.user;
      console.log(user);
      navigate("/");
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any).message;
      console.log(errorCode, errorMessage);
      setError(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const dbUser = await UserCollection.getUser(firebaseUser.uid);
          if (dbUser && dbUser.exists()) {
            setAuthUser(dbUser);
            UserCollection.syncUser(firebaseUser.uid, dbUser);
          } else {
            const newUser = new User({
              id: firebaseUser.uid,
              displayName:
                firebaseUser.displayName || firebaseUser.email || "Anonymous",
              email: firebaseUser.email || "",
              avatarURL: firebaseUser.photoURL || "",
            });
            setAuthUser(newUser);
            await UserCollection.setUser(newUser);
            UserCollection.syncUser(firebaseUser.uid, newUser);
          }
        } catch (error) {
          console.error("Error with login:", { firebaseUser, error });
        }
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Box position="relative">
          <Button display={{ base: "flex", md: "none" }} primary>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
          <Button display={{ base: "none", md: "flex" }} primary>
            {isLogin ? "User Log In" : "Create Account"}
          </Button>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Email address</Field.Label>
                    <Input
                      variant="outline"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email address"
                      autoComplete="username"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      {isLogin ? "Password" : "Create password"}
                    </Field.Label>
                    <Input
                      variant="outline"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                    />
                  </Field.Root>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Button type="submit" primary>
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                  <Text
                    as="span"
                    color="brand.purple.900"
                    cursor="pointer"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "Need an account? Sign Up"
                      : "Already have an account? Login"}
                  </Text>
                </Stack>
              </form>
            </Popover.Body>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default AuthenticationPopover;
