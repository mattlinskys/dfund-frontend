import { useLocation } from "react-router-dom";

const useHashValue = () => {
  const { hash } = useLocation();
  return hash ? hash.replace("#", "") : undefined;
};

export default useHashValue;
