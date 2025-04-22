import { Box } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdOutlineRemoveRedEye } from "react-icons/md";
const Eye: IconType = MdOutlineRemoveRedEye;


const MovieCardHover = () => {
  return (
    <Box
      className="movie-card-hover"
      w="100%"
      h="100%"
      bg="blackAlpha.800"
      position="absolute"
      top="0"
      left="0"
      transition="opacity"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="5xl"
    >
      <Eye />
    </Box>
  );
};

export default MovieCardHover;
