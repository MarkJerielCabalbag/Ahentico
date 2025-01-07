import { useNavigate } from "react-router-dom";
import { User } from "../types/types";
import { useState } from "react";
import React from "react";
import { hooks } from "../hooks/hooks";
import { Button, Input } from "@material-tailwind/react";

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
      <div className="flex flex-col gap-3 w-2/6 p-10">
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-center">Ahentico</h1>
          <p className="italic opacity-70 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, eos?
          </p>

          <Input
            type="text"
            value={user?.username}
            name="username"
            onChange={handleChange}
            label="Username"
          />

          <Input
            type="email"
            value={user?.email}
            name="email"
            onChange={handleChange}
            label="Email"
          />

          <Input
            type="password"
            name="password"
            value={user?.password}
            onChange={handleChange}
            label="Password"
          />

          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              disabled={isPending}
              loading={isPending}
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
              Register
            </Button>

            <Button variant="text" onClick={() => navigate("/")}>
              Already have an account? Login here!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
