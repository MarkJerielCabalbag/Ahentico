import { useNavigate } from "react-router-dom";
import { User } from "../types/types";
import { useState } from "react";
import React from "react";
import { hooks } from "../hooks/hooks";

const SignUp = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const { mutateAsync, isError, error, isPending } = hooks.useRegisterUser();
  return (
    <div className="flex justify-center items-center h-screen">
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
                Username
              </span>
            </div>
            <input
              type="text"
              value={user?.username}
              name="username"
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
              <span className="label-text flex items-center gap-2 text-md">
                Email
              </span>
            </div>
            <input
              type="email"
              name="email"
              value={user?.email}
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
              <span className="label-text flex gap-2 items-center">
                Password
              </span>
            </div>
            <input
              type="password"
              name="password"
              value={user?.password}
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
                    username: user.username,
                    email: user.email,
                    password: user.password,
                  });
                } catch (error) {}
              }}
            >
              {isPending ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Register"
              )}
            </button>
            <div className="divider divider-neutral"></div>
            <a
              className="link link-primary text-center"
              onClick={() => navigate("/")}
            >
              Already have an account? Login here!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
