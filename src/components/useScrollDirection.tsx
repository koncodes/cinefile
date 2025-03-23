import React, { useState, useEffect, useRef } from "react";

function ScrollComponent() {
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollY(scrollContainerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: "200px", overflowY: "scroll" }}
    >
      {/* Large content to enable scrolling */}
      <div
        style={{
          height: "500px",
          background: "lightgray",
          position: "relative",
        }}
      >
        <div style={{ position: "sticky" }}>Scroll position: {scrollY}</div>
      </div>
    </div>
  );
}

export default ScrollComponent;
