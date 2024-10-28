import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<DashboardUpcomingAppointments>[] = [
  {
    accessorKey: "id",
    header: "Session Name",
    cell: ({ row }) => (
      <div className="">
        {row.original.course} - {row.original.coachee}{" "}
        {moment(row.original.date).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "course",
    header: "Session Type",
    cell: ({ row }) => <div className="">{row.original.course}</div>,
  },
  {
    accessorKey: "date",
    header: "Session Date",
    cell: ({ row }) => (
      <div className="">{moment(row.original.date).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    accessorKey: "sessionTime",
    header: "Session Time",
    cell: ({ row }) => <div className="">{row.original.sessionTime}</div>,
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => (
      <div className="">
        <Link to={`/appointments/${row.original.id}/review`}>
          <Button variant="link" className="-m-4 underline">
            View Details
          </Button>
        </Link>
      </div>
    ),
  },
];

export function DashboardAppointmentsTable({
  data,
}: {
  data: DashboardUpcomingAppointments[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return (
    <div className="rounded-md border">
      <Table>
        {/* Render Table Header */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* Render Table Body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => console.log("row", row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-2 text-black">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
