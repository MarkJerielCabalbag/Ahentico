import AlertInfo from "@/components/Alert";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/hooks";
import { UserType } from "@/types/type";
import { CircleAlert, Loader2 } from "lucide-react";
import React, { useState } from "react";

const SignIn = () => {
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { mutateAsync, isError, isPending, error } = useLogin(
    () => setUser({ email: "", password: "" }),
    () => setUser({ email: "", password: "" })
  );

  return (
    <div className="flex flex-col gap-5">
      {isError && (
        <AlertInfo
          title={<h4 className="text-red-600">Error</h4>}
          message={
            <p className="text-red-600 flex gap-2 items-center">
              <CircleAlert size={20} /> {error.message} *
            </p>
          }
        />
      )}
      <div>
        <Label>
          Email {isError ? <span className="text-red-500">*</span> : ""}
        </Label>
        <Input
          name="email"
          value={user?.email}
          placeholder="Your email account"
          onChange={handleChange}
          className={`${isError ? "border-red-600" : ""}`}
        />
      </div>
      <div>
        <Label>
          Password {isError ? <span className="text-red-500">*</span> : ""}
        </Label>
        <Input
          name="password"
          value={user?.password}
          placeholder="Your password"
          onChange={handleChange}
          className={`${isError ? "border-red-600" : ""}`}
        />
      </div>
      <Button
        disabled={isPending}
        onClick={async () => {
          await mutateAsync({
            email: user.email,
            password: user.password,
          });
        }}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Login"}
      </Button>
    </div>
  );
};

export default SignIn;
