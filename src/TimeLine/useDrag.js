import { useState, useEffect, useCallback } from "react";

const useDrag = (updateSeekbarPosition) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    updateSeekbarPosition(event.clientX);
  };

  const handleMouseMove = useCallback(
    (event) => {
      if (isDragging) {
        updateSeekbarPosition(event.clientX);
      }
    },
    [isDragging, updateSeekbarPosition]
  );

  const handleMouseUp = useCallback(
    (event) => {
      updateSeekbarPosition(event.clientX, false);
      setIsDragging(false);
    },
    [updateSeekbarPosition]
  );

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (event) => handleMouseMove(event);
      const handleGlobalMouseUp = (event) => handleMouseUp(event);

      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
        window.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return { handleMouseDown, isDragging };
};

export default useDrag;
