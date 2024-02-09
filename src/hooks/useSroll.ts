import { useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  onReachBottom: () => void;
}

const useScroll = ({ onReachBottom }: InfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position
    const threshold = document.documentElement.scrollHeight * 0.8; // 80% of the page height

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
export default useScroll;
