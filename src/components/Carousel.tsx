import React, { useEffect, useState, useRef } from "react";
import { Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { IconType } from "react-icons";

const LeftArrowAlt: IconType = BiLeftArrowAlt;
const RightArrowAlt: IconType = BiRightArrowAlt;

interface ChakraCarouselProps {
  children: React.ReactNode;
  gap: number;
  itemsToShowBase?: number;
  itemsToShowSm?: number;
  itemsToShowMd?: number;
  itemsToShowLg?: number;
  itemsToShowXl?: number;
}

const Carousel: React.FC<ChakraCarouselProps> = ({
  children,
  gap,
  itemsToShowBase = 1,
  itemsToShowSm = 2,
  itemsToShowMd = 3,
  itemsToShowLg = 4,
  itemsToShowXl = 5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);

  const responsiveItemsToShow =
    useBreakpointValue({
      base: itemsToShowBase,
      sm: itemsToShowSm,
      md: itemsToShowMd,
      lg: itemsToShowLg,
      xl: itemsToShowXl,
    }) || 5;

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const extendedChildren = [
    ...childrenArray.slice(-responsiveItemsToShow),
    ...childrenArray,
    ...childrenArray.slice(0, responsiveItemsToShow),
  ];

  const calculateCardWidth = () => {
    const containerWidth =
      trackContainerRef.current?.getBoundingClientRect().width || 0;
    const calculatedItemWidth =
      (containerWidth - gap * (responsiveItemsToShow - 1)) /
      responsiveItemsToShow;
    setItemWidth(calculatedItemWidth);
    setTrackWidth(
      calculatedItemWidth * extendedChildren.length +
        gap * (extendedChildren.length - 1)
    );
    setSliderWidth(containerWidth);
  };

  useEffect(() => {
    calculateCardWidth();
    window.addEventListener("resize", calculateCardWidth);
    return () => window.removeEventListener("resize", calculateCardWidth);
  }, [children, responsiveItemsToShow]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(${
        -responsiveItemsToShow * (itemWidth + gap)
      }px)`;

      trackRef.current.offsetHeight;

      trackRef.current.style.transition = trackIsActive
        ? "transform 0.2s"
        : "none";
    }
  }, [itemWidth, responsiveItemsToShow]);

  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => {
      if (currentIndex <= 0) {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(${
            -(totalItems + responsiveItemsToShow - 1) * (itemWidth + gap)
          }px)`;

          trackRef.current.offsetHeight;

          setCurrentIndex(totalItems - 1);
          trackRef.current.style.transition = trackIsActive
            ? "transform 0.2s"
            : "none";
        }
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      if (currentIndex >= totalItems - 1) {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(${
            -responsiveItemsToShow * (itemWidth + gap)
          }px)`;

          trackRef.current.offsetHeight;

          setCurrentIndex(0);
          trackRef.current.style.transition = trackIsActive
            ? "transform 0.2s"
            : "none";
        }
      }
      setIsTransitioning(false);
    }, 200);
  };

  const getCardsToRender = () => {
    return extendedChildren
      .filter((child): child is React.ReactElement =>
        React.isValidElement(child)
      )
      .map((child, index) => {
        return React.cloneElement(child, {
          style: {
            minWidth: `${itemWidth}px`,
            maxWidth: `${itemWidth}px`,
            marginRight: `${index === extendedChildren.length - 1 ? 0 : gap}px`,
          },
          key: index,
        });
      });
  };

  const trackStyle = {
    transform: `translateX(${
      -(currentIndex + responsiveItemsToShow) * (itemWidth + gap)
    }px)`,
    transition: trackIsActive ? "transform 0.2s ease" : "none",
    width: `${trackWidth}px`,
  };

  return (
    <Flex w="full" position="relative">
      <Flex ref={trackContainerRef} w="full">
        <Flex ref={trackRef} style={trackStyle} >
          {getCardsToRender()}
        </Flex>
      </Flex>

      <IconButton
        tertiary
        asChild
        aria-label="Previous"
        position="absolute"
        left={{ base: "-4", md: "-5" }}
        top="50%"
        transform="translateY(-50%)"
        onClick={handlePrev}
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
        zIndex={2}
      >
        <RightArrowAlt />
      </IconButton>
    </Flex>
  );
};

export default Carousel;
