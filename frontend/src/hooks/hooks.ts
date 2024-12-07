import { useState, useEffect } from "react";
import { UserType } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, register } from "./api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = (onError?: () => void, onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (user: UserType) => register(user),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess?.();
    },
  });
};

export const useLogin = (onError?: () => void, onSuccess?: () => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (user: UserType) => login(user),
    onError: (error) => {
      toast.error(error.message);

      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/flowStock");
      onSuccess?.();
    },
  });
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
