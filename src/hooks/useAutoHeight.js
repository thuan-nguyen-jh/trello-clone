import { useLayoutEffect, useRef } from "react";

export default function useAutoHeight(valueState) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    ref.current.style.height = "inherit"; // reset height to shrink on delete
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [valueState]);

  return ref;
}