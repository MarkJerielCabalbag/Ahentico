import { Ahente, ProductType, User } from "../types/types";

const baseUrl = "http://localhost:3000/api/agentify";

export const client = {
  //user register
  async userRegister({ username, email, password }: User) {
    return await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },
  //user login
  async userLogin({ email, password }: User) {
    return await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //user info
  async userInfo(id: string) {
    return await fetch(`${baseUrl}/auth/me/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //view list of ahentes
  async viewAhentes(id: string) {
    return await fetch(`${baseUrl}/ahente/list/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //new ahente
  async registerAhente(
    { name, company, contact, productCoverage }: Ahente,
    id: String
  ) {
    return await fetch(`${baseUrl}/ahente/register/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company, contact, productCoverage }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },
  //view ahente details
  async viewAhente(ahenteId: string) {
    return await fetch(`${baseUrl}/ahente/view/${ahenteId}}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //edit ahente
  async editAhente(
    { name, company, contact, productCoverage }: Ahente,
    id: String
  ) {
    return await fetch(`${baseUrl}/ahente/edit/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company, contact, productCoverage }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //remove ahente
  async removeAhente(id: String) {
    return await fetch(`${baseUrl}/ahente/del/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //view products associated with ahente
  async viewProducts(ahenteId: string) {
    return await fetch(`${baseUrl}/product/list/${ahenteId}}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //view product category associated with user
  async viewCategories(ahenteId: string) {
    return await fetch(`${baseUrl}/category/view/${ahenteId}}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //register a product associated with ahente
  async registerProduct(
    id: string,
    {
      productName,
      productCategory,
      productDescription,
      productPricePerUnit,
      productUnit,
      productUnitMeasurement,
    }: ProductType
  ) {
    return await fetch(`${baseUrl}/product/register/${id}}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        productCategory,
        productDescription,
        productPricePerUnit,
        productUnit,
        productUnitMeasurement,
      }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //remove product associated with ahente
  async removeProduct(productId: string) {
    return await fetch(`${baseUrl}/product/remove/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //edit product associated with ahente
  async editProduct(
    productId: string,
    {
      productName,
      productCategory,
      productDescription,
      productPricePerUnit,
      productUnit,
      productUnitMeasurement,
    }: ProductType
  ) {
    return await fetch(`${baseUrl}/product/edit/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        productCategory,
        productDescription,
        productPricePerUnit,
        productUnit,
        productUnitMeasurement,
      }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },
};
