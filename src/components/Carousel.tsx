// ChakraCarousel.jsx
import React, { useEffect, useState, useRef } from "react";
import { Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { IconType } from "react-icons";

const LeftArrowAlt: IconType = BiLeftArrowAlt;
const RightArrowAlt: IconType = BiRightArrowAlt;

interface ChakraCarouselProps {
  children: React.ReactNode;
  gap: number;
  itemsToShow?: number;
}

const Carousel: React.FC<ChakraCarouselProps> = ({
  children,
  gap,
  itemsToShow = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [multiplier, setMultiplier] = useState(0.35);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [constraint, setConstraint] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);

  // Responsive item counts based on screen size
  const responsiveItemsToShow =
    useBreakpointValue({
      base: 1,
      sm: 2,
      md: 3,
      lg: itemsToShow,
    }) || itemsToShow;

  const calculateCardWidth = () => {
    const containerWidth =
      trackContainerRef.current?.getBoundingClientRect().width || 0;
    const calculatedItemWidth =
      (containerWidth - gap * (responsiveItemsToShow - 1)) /
      responsiveItemsToShow;
    setItemWidth(calculatedItemWidth);
    setTrackWidth(
      calculatedItemWidth * React.Children.toArray(children).length +
        gap * (React.Children.toArray(children).length - 1)
    );
    setConstraint(containerWidth - trackWidth);
    setSliderWidth(containerWidth);
  };

  useEffect(() => {
    calculateCardWidth();
    window.addEventListener("resize", calculateCardWidth);
    return () => window.removeEventListener("resize", calculateCardWidth);
  }, [children, responsiveItemsToShow]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (
      currentIndex <
      React.Children.toArray(children).length - responsiveItemsToShow
    ) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getCardsToRender = () => {
    return React.Children.toArray(children)
      .filter((child): child is React.ReactElement =>
        React.isValidElement(child)
      )
      .map((child, index) => {
        return React.cloneElement(child, {
          style: {
            minWidth: `${itemWidth}px`,
            maxWidth: `${itemWidth}px`,
            marginRight: `${index === React.Children.toArray(children).length - 1 ? 0 : gap}px`,
          },
        });
      });
  };

  const trackStyle = {
    transform: `translateX(${-currentIndex * (itemWidth + gap)}px)`,
    transition: trackIsActive ? "transform 0.2s" : "none",
    width: `${trackWidth}px`,
  };

  return (
    <Flex w="full" position="relative">
      <Flex ref={trackContainerRef} w="full" overflow="hidden">
        <Flex ref={trackRef} style={trackStyle}>
          {getCardsToRender()}
        </Flex>
      </Flex>

      {/* Navigation arrows */}
      <IconButton
        tertiary
        asChild
        aria-label="Previous"
        position="absolute"
        left={{ base: "-4", md: "-5" }}
        top="50%"
        transform="translateY(-50%)"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        zIndex={2}
      >
        <LeftArrowAlt />
      </IconButton>

      <IconButton
        tertiary
        asChild
        aria-label="Next"
        position="absolute"
        right={{ base: "-4", md: "-5" }}
        top="50%"
        transform="translateY(-50%)"
        onClick={handleNext}
        disabled={
          currentIndex >=
          React.Children.toArray(children).length - responsiveItemsToShow
        }
        zIndex={2}
      >
        <RightArrowAlt />
      </IconButton>
    </Flex>
  );
};

export default Carousel;
