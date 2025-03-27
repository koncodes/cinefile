import { Card, Flex, Text } from "@chakra-ui/react";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import ReviewCollection from "@/firebase/ReviewCollection";
import { Review } from "@/entities/Review";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    try {
      const reviewData = await ReviewCollection.getAllReviews();
      setReviews(reviewData.slice(0, 10));
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  }

  return (
    <Carousel gap={25} itemsToShow={4}>
      {reviews?.map((review, index) => (
        <Flex key={index} direction="column">
          <ReviewCard review={review} />
        </Flex>
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
