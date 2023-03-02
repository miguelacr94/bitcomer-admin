import { useCallback, useEffect, useState } from "react";

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return useCallback(() => isMounted, []);
};

export default useIsMounted;
