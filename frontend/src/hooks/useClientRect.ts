import { RefObject, useEffect, useState } from "react";

function useClientRect(ref: RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function setClientRect() {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    }

    setClientRect();
    window.addEventListener("resize", setClientRect);

    return () => {
      window.removeEventListener("resize", setClientRect);
    };
  }, [ref]);

  return { width, height };
}

export default useClientRect;
