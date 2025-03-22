import { Movie } from "@/entities/Movie";
import { axiosInstance } from "@/services/api-client";

const fetchMovie = async (movieId: number): Promise<Movie | null> => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data as Movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
};

export default fetchMovie;
