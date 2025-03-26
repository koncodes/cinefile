import { User } from "@/entities/User";
import UserCollection from "@/firebase/UserCollection";
import { userAuthStore } from "@/stores/AuthStore";
import {
  Button,
  Field,
  Flex,
  Heading,
  Input,
  Stack
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  displayName: string;
}

interface Errors {
  displayName?: string;
}

const SettingsForm = () => {
  const navigate = useNavigate();
  const authUser = userAuthStore((s) => s.authUser);
  const [formData, setFormData] = useState<FormData>({
    displayName: authUser?.displayName || "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    const newErrors: {
      displayName?: string;
    } = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    } else if (formData.displayName.trim().length < 3) {
      newErrors.displayName = "Display name should be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitButton = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!authUser) return;
      if (!validateForm()) return;

      const newUser = new User({
        id: authUser.id || "",
        displayName: formData.displayName,
        email: authUser.email,
        avatarURL: authUser.avatarURL,
      });

      try {
        await UserCollection.updateUserProfile(newUser, {
          avatarURL: authUser.avatarURL,
        });
        navigate(`/users/${authUser.id}`);
      } catch (error) {
        console.error("Error saving review:", error);
      }
    };
    return (
      <Flex justify="flex-end">
        <Button
          type="submit"
          colorScheme="blue"
          loadingText="Submitting"
          onClick={handleSubmit as any}
        >
          Submit Changes
        </Button>
      </Flex>
    );
  };

  if (!authUser) return null;

  return (
    <form>
      <Heading size="md" mb={4}>
        Editing {authUser.displayName}'s Profile
      </Heading>

      <Stack gap={4}>
        <Field.Root state={errors.displayName ? "error" : "default"}>
          <Field.Label>Display Name</Field.Label>
          <Input
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder="Choose a unique display name."
            name="displayName"
            required
          />
          <Field.HelperText>Minimum 3 characters.</Field.HelperText>
          {errors.displayName && (
            <Field.ErrorText>{errors.displayName}</Field.ErrorText>
          )}
        </Field.Root>

        <SubmitButton />
      </Stack>
    </form>
  );
};

export default SettingsForm;
