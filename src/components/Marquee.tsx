import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bg?: string;
  color?: string;
  h?: string;
  paddingBlock?: string;
}

function Marquee({ children, bg, color, h = "100px", paddingBlock }: Props) {
  return (
    <Box
      overflow="hidden"
      w="100%"
      position="relative"
      bg={bg}
      color={color}
      h={h}
      paddingBlock={paddingBlock}
      display="flex"
      alignItems="center"
      padding="0"
    >
      <motion.div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {[...Array(2)].map((_, i) => (
          <Box
            key={i}
            mx="40px"
            display="flex"
            alignItems="center"
            margin="2em"
          >
            {children}
          </Box>
        ))}
        {[...Array(2)].map((_, i) => (
          <Box
            key={`dup-${i}`}
            mx="40px"
            display="flex"
            alignItems="center"
            margin="2em"
          >
            {children}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

export default Marquee;
