import { User } from "@/entities/User";
import UserCollection from "@/firebase/UserCollection";
import { userAuthStore } from "@/stores/AuthStore";
import {
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Stack,
  Box,
  FileUpload,
  Icon,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "./ui/toaster";
import { LuUpload } from "react-icons/lu";

interface FormData {
  email: string;
  displayName: string;
  avatarURL?: string | null;
}

interface Errors {
  email?: string;
  displayName?: string;
  avatar?: string;
}

const UserSettingsForm = () => {
  const navigate = useNavigate();
  const authUser = userAuthStore((s) => s.authUser);
  const [formData, setFormData] = useState<FormData>({
    displayName: authUser?.displayName || "",
    email: authUser?.email || "",
    avatarURL: authUser?.avatarURL || "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authUser) {
      setFormData({
        displayName: authUser.displayName || "",
        email: authUser.email || "",
        avatarURL: authUser.avatarURL || "",
      });
    }
  }, [authUser]);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    } else if (formData.displayName.trim().length < 3) {
      newErrors.displayName = "Display name should be at least 3 characters";
    }

    if (selectedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        newErrors.avatar =
          "Invalid file type. Only JPG, PNG, GIF and WebP are allowed.";
      }

      if (selectedFile.size > 500 * 1024) {
        newErrors.avatar = "File too large. 500KB max.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authUser) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const newUser = new User({
        id: authUser.id || "",
        displayName: formData.displayName,
        email: authUser.email,
        avatarURL: authUser.avatarURL,
      });

      await UserCollection.updateUserProfile(newUser, {
        image: selectedFile || undefined,
        avatarURL: !selectedFile ? authUser.avatarURL : undefined,
      });
      toaster.create({
        description: "Profile updated successfully",
        duration: 6000,
      });
      // navigate(`/users/${authUser.id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to update profile. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authUser) return null;

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root>
        <Fieldset.Legend>
          <Heading as="h1" size="4xl" marginBottom="5">
            Editing {authUser.displayName}'s Profile
          </Heading>
        </Fieldset.Legend>
        <Fieldset.Content w="100%">
          <Stack direction={{ base: "column", md: "row" }} w="100%" gap="10">
            <VStack flex="1" gap="5">
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
              <Field.Root state={errors.email ? "error" : "default"}>
                <Field.Label>Email</Field.Label>
                <Input
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Add an email address."
                  name="email"
                  required
                  disabled
                />
                <Field.HelperText>Email cannot be changed.</Field.HelperText>
              </Field.Root>
            </VStack>
            <VStack flex="1">
              <Field.Root state={errors.avatar ? "error" : "default"}>
                <Field.Label>Profile Picture</Field.Label>
                <FileUpload.Root
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={1}
                  onFileChange={handleFileChange}
                  css={{
                    "& .chakra-file-upload__item": {
                      borderWidth: "1px",
                      borderColor: "border.card",
                      borderStyle: "solid",
                      borderRadius: "md",
                      bg: "transparent",
                    },
                  }}
                >
                  <FileUpload.HiddenInput
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={(e: { target: { files: FileList | null } }) => {
                      console.log("File input triggered!", e.target.files);
                      handleFileChange(e.target.files);
                    }}
                  />
                  <FileUpload.Dropzone
                    borderWidth="1px"
                    borderColor="border.card"
                    borderStyle="dashed"
                    borderRadius="md"
                    bg="transparent"
                  >
                    {formData.avatarURL && !selectedFile ? (
                      <Image
                        src={formData.avatarURL}
                        alt="Current avatar"
                        w="100px"
                        borderRadius="100%"
                      />
                    ) : (
                      <Icon as={LuUpload} size="md" color="fg.muted" />
                    )}

                    <FileUpload.DropzoneContent>
                      <Box>Drag and drop files here</Box>
                      <Box color="fg.muted">.png, .jpg up to 500KB</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List />
                </FileUpload.Root>
                {errors.avatar && (
                  <Field.ErrorText>{errors.avatar}</Field.ErrorText>
                )}
              </Field.Root>
            </VStack>
          </Stack>
          <Flex justify="flex-end" mt="6">
            <Button
              type="submit"
              primary
              loading={isSubmitting}
              loadingText="Submitting"
            >
              Submit Changes
            </Button>
          </Flex>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
};

export default UserSettingsForm;
