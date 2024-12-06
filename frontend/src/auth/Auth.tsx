import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="bg-slate-200 w-full h-full">
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold">flowStock</h1>
          <p className="italic opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            expedita.
          </p>
          <Tabs defaultValue="signin" className="w-1/2 h-1/2 my-10 rounded-md ">
            <TabsList className="flex gap-2 mb-10">
              <TabsTrigger
                value="signin"
                className="bg-slate-600 w-1/2 text-white"
              >
                Sign-in
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="bg-slate-600 w-1/2 text-white"
              >
                Sign-up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignIn />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="bg-slate-900 w-full h-full flex justify-center items-center">
        <h1 className="text-7xl text-white">flowStock</h1>
      </div>
    </div>
  );
};

export default Auth;
