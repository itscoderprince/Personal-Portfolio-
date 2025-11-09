import { useEffect, useState } from "react";
import { useMotionValue, animate } from "motion/react";

type CounterProps = {
  value: number;
};

const AnimatedCounter = ({ value }: CounterProps) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}</span>;
};

export default AnimatedCounter;
