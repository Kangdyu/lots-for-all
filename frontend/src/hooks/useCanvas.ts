/* Reference: https://blog.dalgu.app/dev/1 */
import { useEffect, useRef } from "react";

function useCanvas(
  canvasWidth: number,
  canvasHeight: number,
  animate: (ctx: CanvasRenderingContext2D) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    function initCanvas() {
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canvas && ctx) {
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;

        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }
    initCanvas();

    let requestId: number;
    function requestAnimaion() {
      requestId = window.requestAnimationFrame(requestAnimaion);

      if (ctx) {
        animate(ctx);
      }
    }
    requestAnimaion();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [canvasWidth, canvasHeight, animate]);

  return canvasRef;
}

export default useCanvas;
