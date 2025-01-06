import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types";
import { hooks } from "../hooks/hooks";
import { Button, Input } from "@material-tailwind/react";

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
    <div className="flex flex-col gap-3 w-2/6 p-10">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-primary text-center">
          Ahentico
        </h1>
        <p className="italic opacity-70 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, eos?
        </p>

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
                  email: user.email,
                  password: user.password,
                });
              } catch (error) {}
            }}
          >
            Login
          </Button>

          <Button variant="text" onClick={() => navigate("/register")}>
            No account yet? Register here!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
