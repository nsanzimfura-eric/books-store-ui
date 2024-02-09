import React, { useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  onReachBottom: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onReachBottom }) => {
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.documentElement.scrollHeight * 0.8;

    if (scrollPosition >= threshold) {
      onReachBottom();
    }
  }, [onReachBottom]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return null;
};

export default InfiniteScroll;
