import { Button } from "@/components/ui/button";
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
import { useNavigate } from "@tanstack/react-router";

export const columns: ColumnDef<DashboardUpcomingAppointments>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-muted-foreground">#{row.original.id}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {moment(row.original.date).format("MMMM DD, YYYY HH:MM")} -{" "}
        {row.original.duration} Mins
      </div>
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.course}</div>
    ),
  },
  {
    accessorKey: "coachee",
    header: "Coachee",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.coachee}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="decline">Decline</SelectItem>
              <SelectItem value="accept">Accept</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
    <Table>
      {/* Render Table Header */}
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
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
                <TableCell key={cell.id}>
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
  );
}
