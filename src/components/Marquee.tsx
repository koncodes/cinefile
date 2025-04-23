import { Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  bg?: string;
  color?: string;
  h?: string;
  paddingBlock?: string;
  speed?: number;
}

function Marquee({
  children,
  bg,
  color,
  h = "100px",
  paddingBlock,
  speed = 60,
}: Props) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    });
  }, [controls, speed]);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start({
      x: "-50%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    });
  };

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          x: "0%", // Start position
        }}
        animate={controls}
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
