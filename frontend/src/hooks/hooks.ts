import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ahente, ID, ProductCategory, ProductType, User } from "../types/types";
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

const useRegisterProduct = (
  id: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: ProductType) => client.registerProduct(id, product),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });

      onSuccess?.();
    },
  });
};

const useRemoveProduct = (
  productId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.removeProduct(productId),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess?.();
    },
  });
};

const useEditProduct = (
  productId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (editedProduct: ProductType) =>
      client.editProduct(productId, editedProduct),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess?.();
    },
  });
};

const useAddProductCategory = (
  userId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: ProductCategory) =>
      client.registerCategory(userId, category),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      onSuccess?.();
    },
  });
};

const useRemoveProductCategory = (
  categoryId: number,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.removeCategory(categoryId),
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      onSuccess?.();
    },
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
  useRegisterProduct,
  useRemoveProduct,
  useEditProduct,
  useAddProductCategory,
  useRemoveProductCategory,
};
