import { MovieReference } from "@/entities/Movie";
import { Review } from "@/entities/Review";
import { UserReference } from "@/entities/User";
import ReviewCollection from "@/firebase/ReviewCollection";
import useMovie from "@/hooks/useMovie";
import { userAuthStore } from "@/stores/AuthStore";
import {
  Button,
  Dialog,
  Field,
  Flex,
  Heading,
  Icon,
  RatingGroup,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDialogContext,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  movieId: number;
  id?: string;
}

interface FormData {
  rating: number;
  content: string;
}

const ReviewForm = ({ movieId, id }: Props) => {
  const { data: movie, isLoading, error } = useMovie(movieId);
  const navigate = useNavigate();
  const authUser = userAuthStore((s) => s.authUser);
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    content: "",
  });
  const [errors, setErrors] = useState<{
    rating?: string;
    content?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      rating?: string;
      content?: string;
    } = {};

    if (formData.rating <= 0) {
      newErrors.rating = "Please select a valid rating";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Review content is required";
    } else if (formData.content.trim().length < 1) {
      newErrors.content = "Review should be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!id) return;

    const fetchReview = async () => {
      try {
        const reviewData = await ReviewCollection.getReviewById(id);
        if (reviewData) {
          setFormData({
            rating: reviewData.rating || 0,
            content: reviewData.content || "",
          });
        } else {
          navigate(`/films/${movieId}`);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const SubmitButton = () => {
    const onClose = useDialogContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!authUser || !movie) return;
      if (!validateForm()) return;

      const newReview = new Review({
        id: id || "",
        userId: authUser.id,
        user: {
          id: authUser.id,
          displayName: authUser.displayName,
          email: authUser.email,
          avatarURL: authUser.avatarURL,
        } as UserReference,
        rating: formData.rating,
        content: formData.content,
        created: id ? undefined : Timestamp.now(),
        updated: Timestamp.now(),
        movieId: movie.id,
        movie: {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        } as MovieReference,
      });

      try {
        if (id) {
          await ReviewCollection.updateReview(newReview);
        } else {
          await ReviewCollection.addReview(newReview);
        }
        onClose.setOpen(false);
        navigate(`/films/${movieId}`);
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
          Submit Review
        </Button>
      </Flex>
    );
  };

  if (isLoading) return <Spinner />;
  if (error || !movie) throw error;

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline">Leave Review</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title />
          </Dialog.Header>
          <Dialog.Body>
            <form>
              <Heading size="md" mb={4}>
                Write a Review for "{movie.title}"
              </Heading>

              <Stack gap={4}>
                <Field.Root state={errors.rating ? "error" : "default"}>
                  <Field.Label>Your Rating</Field.Label>
                  <RatingGroup.Root
                    value={formData.rating}
                    onValueChange={(e: { value: number }) =>
                      handleRatingChange(e.value)
                    }
                    count={5}
                    allowHalf
                  >
                    <RatingGroup.Label>Rate this movie</RatingGroup.Label>
                    <RatingGroup.HiddenInput name="rating" />
                    <RatingGroup.Control>
                      {[1, 2, 3, 4, 5].map((index) => (
                        <RatingGroup.Item key={index} index={index}>
                          <Icon
                            as={
                              formData.rating >= index - 0.5 &&
                              formData.rating < index
                                ? FaStarHalfAlt
                                : formData.rating >= index
                                  ? FaStar
                                  : FaRegStar
                            }
                            color={
                              formData.rating >= index - 0.5 &&
                              formData.rating < index
                                ? "yellow.400"
                                : formData.rating >= index
                                  ? "yellow.400"
                                  : "gray.300"
                            }
                            w={8}
                            h={8}
                          />
                        </RatingGroup.Item>
                      ))}
                    </RatingGroup.Control>
                  </RatingGroup.Root>

                  <Text mt={1} color="gray.500">
                    {formData.rating > 0
                      ? `${formData.rating.toFixed(1)} out of 5 stars`
                      : "Select rating"}
                  </Text>
                  {errors.rating && (
                    <Field.ErrorText>{errors.rating}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root state={errors.content ? "error" : "default"}>
                  <Field.Label>Your Review</Field.Label>
                  <Textarea
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="What did you think about this movie?"
                    minHeight="150px"
                    resize="vertical"
                    name="content"
                    required
                  />
                  <Field.HelperText>Minimum 50 characters.</Field.HelperText>
                  {errors.content && (
                    <Field.ErrorText>{errors.content}</Field.ErrorText>
                  )}
                </Field.Root>

                <SubmitButton />
              </Stack>
            </form>
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ReviewForm;
