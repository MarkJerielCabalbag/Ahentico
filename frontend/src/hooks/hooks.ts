import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/types";
import { client } from "../api/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (user: User) => client.userLogin(user),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/home/${data.id}`);
      onSuccess?.();
    },
  });
};

const useGetUserInfo = (id: string) => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => client.userInfo(id),
  });
};

export const hooks = {
  useRegisterUser,
  useLoginUser,
  useGetUserInfo,
};
