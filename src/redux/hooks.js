import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hooks for auth
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const setUser = useCallback(
    (userData) => {
      dispatch({ type: "auth/setUser", payload: userData });
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch({ type: "auth/logout" });
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated: !!token,
    setUser,
    logout,
  };
};
