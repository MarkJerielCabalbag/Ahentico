import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types";
import { hooks } from "../hooks/hooks";
const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const { mutateAsync, isPending, isError, error } = hooks.useLoginUser();

  return (
    <div className="flex flex-col gap-3 w-2/4 p-10">
      <div className="flex w-full flex-col">
        <h1 className="text-3xl font-extrabold text-primary text-center">
          Ahentico
        </h1>
        <p className="italic opacity-70 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, eos?
        </p>
        <div className="divider divider-neutral"></div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex items-center gap-2 text-md">
              Email
            </span>
          </div>
          <input
            type="email"
            value={user?.email}
            name="email"
            onChange={handleChange}
            placeholder="Type here"
            className={`${
              isError ? "input-error" : ""
            } input input-primary w-full`}
          />
          <div className="label">
            <span className="label-text-alt text-red-500">
              {isError && error.message}
            </span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex gap-2 items-center">Password</span>
          </div>
          <input
            type="password"
            value={user?.password}
            name="password"
            onChange={handleChange}
            placeholder="Type here"
            className={`${
              isError ? "input-error" : ""
            } input input-primary w-full`}
          />
          <div className="label">
            <span className="label-text-alt text-red-500">
              {isError && error.message}
            </span>
          </div>
        </label>
        <div className="flex w-full flex-col">
          <button
            disabled={isPending}
            className="btn btn-primary"
            onClick={async () => {
              try {
                await mutateAsync({
                  email: user.email,
                  password: user.password,
                });
              } catch (error) {}
            }}
          >
            {isPending ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              "Login"
            )}
          </button>
          <div className="divider divider-neutral"></div>
          <a
            className="link link-primary text-center"
            onClick={() => navigate("/register")}
          >
            No account yet? Register here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
