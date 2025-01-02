import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/types";
import { client } from "../api/client";
import toast from "react-hot-toast";

function useRegisterUser(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => client.userRegister(user),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess?.();
    },
  });
}

const useLoginUser = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: (user: User) => client.userLogin(user),
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

export const hooks = {
  useRegisterUser,
  useLoginUser,
};
