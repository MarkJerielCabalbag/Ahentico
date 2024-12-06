import AlertInfo from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/hooks";
import { UserType } from "@/types/type";
import { CircleAlert, Loader2 } from "lucide-react";
import React, { useState } from "react";

const SignUp = () => {
  const [user, setUser] = useState<UserType>({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const { mutateAsync, isPending, isError, error } = useRegister(
    () => setUser({ username: "", email: "", password: "" }),
    () => setUser({ username: "", email: "", password: "" })
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
          Username {isError ? <span className="text-red-500">*</span> : ""}
        </Label>
        <Input
          value={user?.username}
          name="username"
          placeholder="Your username"
          onChange={handleChange}
          className={`${isError ? "border-red-600" : ""}`}
        />
      </div>
      <div>
        <Label>
          Email {isError ? <span className="text-red-500">*</span> : ""}
        </Label>
        <Input
          value={user?.email}
          name="email"
          placeholder="Your email"
          onChange={handleChange}
          className={`${isError ? "border-red-600" : ""}`}
        />
      </div>
      <div>
        <Label>
          Password {isError ? <span className="text-red-500">*</span> : ""}
        </Label>
        <Input
          value={user?.password}
          name="password"
          placeholder="Your password"
          onChange={handleChange}
          className={`${isError ? "border-red-600" : ""}`}
        />
      </div>
      <Button
        disabled={isPending}
        onClick={async () => {
          await mutateAsync({
            username: user.username,
            email: user.email,
            password: user.password,
          });
        }}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Register"}
      </Button>
    </div>
  );
};

export default SignUp;
