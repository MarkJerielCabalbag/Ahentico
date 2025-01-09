import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ahente, ID, User } from "../types/types";
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

const useGetAhentes = (id: string) => {
  return useQuery({
    queryKey: ["ahentes"],
    queryFn: () => client.viewAhentes(id),
  });
};

const useRegisterAhente = (
  id: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ahente: Ahente) => client.registerAhente(ahente, id),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["ahentes"] });
      onSuccess?.();
    },
  });
};

const useGetAhente = (ahenteId: string) => {
  return useQuery({
    queryKey: ["ahente"],
    queryFn: () => client.viewAhente(ahenteId),
  });
};

const useEditAhente = (
  id: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ahente: Ahente) => client.editAhente(ahente, id),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["ahente"] });
      onSuccess?.();
    },
  });
};

const useRemoveAhente = (
  id: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.removeAhente(id),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["ahentes"] });
      onSuccess?.();
    },
  });
};

const useGetProducts = (id: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => client.viewProducts(id),
  });
};

const useGetProductCategories = (id: string) => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => client.viewCategories(id),
  });
};
export const hooks = {
  useRegisterUser,
  useLoginUser,
  useGetUserInfo,
  useGetAhentes,
  useRegisterAhente,
  useGetAhente,
  useEditAhente,
  useRemoveAhente,
  useGetProducts,
  useGetProductCategories,
};
