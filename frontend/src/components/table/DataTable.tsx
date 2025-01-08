import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { TableProps } from "../../types/types";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const DataTable = <T,>({ data, column, to }: TableProps<T>) => {
  const navigate = useNavigate();

  const memoData = useMemo(() => data || [], [data]);

  const columns = useMemo(() => column || [], [column]);

  const table = useReactTable({
    data: memoData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} onClick={() => navigate(`${to}`)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-4 border-b border-blue-gray-50">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
