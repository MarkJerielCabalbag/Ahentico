import { UserType } from "@/types/type";
import { baseUrl } from "./baseUrl";

export async function register({
  username,
  email,
  password,
}: UserType): Promise<{ message: string }> {
  const response = await fetch(`${baseUrl}/api/flowStock/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "An error occurred");
  }

  return responseData;
}

export async function login({
  email,
  password,
}: UserType): Promise<{ message: string }> {
  const response = await fetch(`${baseUrl}/api/flowStock/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "An error occurred");
  }

  return responseData;
}
