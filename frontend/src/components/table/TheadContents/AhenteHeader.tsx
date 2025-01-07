import React from "react";
import { Typography } from "@material-tailwind/react";
const AhenteHeader = () => {
  return (
    <thead className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
      <tr>
        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Name
          </Typography>
        </th>

        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Company
          </Typography>
        </th>

        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            Contact
          </Typography>
        </th>
      </tr>
    </thead>
  );
};

export default AhenteHeader;
