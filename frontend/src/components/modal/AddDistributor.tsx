import React, { useState } from "react";
import ReusableModal from "../ReusableModal";
import { DistributorType, ModalType } from "@/types/type";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Building, CircleAlert, Mail, PhoneCall, User } from "lucide-react";
const AddDistributor = ({ open, onOpenChange }: ModalType) => {
  const [distributor, setDistributor] = useState<DistributorType>({
    name: "",
    company: "",
    phonenumber: "",
    email: "",
  });
  return (
    <ReusableModal
      open={open}
      onOpenChange={onOpenChange}
      alertDialogTitle={"New Distributor"}
      alertDialogDescription={
        <>
          <p className="italic text-sm opacity-70 text-pretty">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum quas
            quibusdam placeat repudiandae quisquam incidunt error asperiores
            distinctio amet maxime!
          </p>

          <form>
            <div className="my-2">
              <Label className="flex items-center gap-1 mb-3">
                <User /> Name
              </Label>
              <Input
                name="name"
                value={distributor?.name}
                placeholder="Distributor's Name"
              />
            </div>
            <div className="my-2">
              <Label className="flex items-center gap-1 mb-3">
                <Building />
                Company
              </Label>
              <Input
                name="company"
                value={distributor?.company}
                placeholder="Distributor's Company"
              />
            </div>
            <div className="w-full flex my-2">
              <div className="w-1/2">
                <Label className="flex items-center gap-1 mb-3">
                  <PhoneCall
                    name="phonenumber"
                    value={distributor?.phonenumber}
                  />{" "}
                  Contact Number
                </Label>
                <PhoneInput defaultCountry="ph" />
              </div>
              <div className="w-1/2">
                <Label className="flex items-center gap-1 mb-3">
                  <Mail />
                  Email (optional)
                </Label>
                <Input
                  name="email"
                  value={distributor?.email}
                  placeholder="Distributor's Email Address"
                />
              </div>
            </div>
          </form>
        </>
      }
      alertDialogFooter={
        <>
          <Button onClick={() => onOpenChange(!open)}>Close</Button>
          <Button>Add</Button>
        </>
      }
    />
  );
};

export default AddDistributor;
