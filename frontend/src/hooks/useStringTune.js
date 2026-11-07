import { useEffect, useRef } from "react";
import { StringTune } from "@fiddle-digital/string-tune";

/**
 * Custom hook to initialize and manage StringTune modular animations in React.
 *
 * @param {Array<Function>} modules - Array of StringTune modules to register (e.g. StringParallax, StringMagnetic, StringTilt, etc.)
 * @param {Object} [options={}] - Configuration options
 * @param {number} [options.fps=60] - Target FPS for the animation loop
 * @param {Object} [options.settings={}] - Custom settings passed to modules
 * @returns {React.MutableRefObject<StringTune|null>} Reference to the StringTune instance
 */
export function useStringTune(modules = [], options = {}) {
  const { fps = 60, settings = {} } = options;
  const instanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const instance = StringTune.getInstance();
      instanceRef.current = instance;

      modules.forEach((mod) => {
        if (mod) {
          instance.use(mod, settings);
        }
      });

      instance.start(fps);
    } catch (err) {
      console.error("[StringTune] Failed to initialize:", err);
    }

    return () => {
      instanceRef.current = null;
    };
  }, [modules, fps, settings]);

  return instanceRef;
}

export default useStringTune;
