import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useNavigateHash = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const navigateHash = useCallback(
    (hash?: string) => {
      navigate(pathname + search + (hash ? `#${hash}` : ""));
    },
    [pathname, search, navigate]
  );

  return navigateHash;
};

export default useNavigateHash;
