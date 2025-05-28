
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${!isVisible ? 'hidden' : ''}`}>
      <div className="preloader-logo">
        Boobalan D
      </div>
    </div>
  );
};

export default Preloader;
