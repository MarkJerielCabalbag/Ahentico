import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { TableProps } from "../types/types";

export function Table({ tableHeader, tableBody, tableFooter }: TableProps) {
  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          {tableHeader}

          {tableBody}
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {tableFooter}
      </CardFooter>
    </Card>
  );
}
