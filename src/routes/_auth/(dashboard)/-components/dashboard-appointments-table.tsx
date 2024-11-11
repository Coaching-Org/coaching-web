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
import { Input } from "@/components/ui/input";
import { AppointmentDetail } from "@/services/appointments/appointments.type";
import { useCoachingContext } from "@/hooks/context";
import { AppointmentDetailV2 } from "@/interfaces";

export const columns: ColumnDef<AppointmentDetailV2>[] = [
  {
    accessorKey: "id",
    header: "Session Name",
    cell: ({ row }) => (
      <div className="">
        {row.original.courseName} - {row.original.coacheeName}{" "}
        {moment(row.original.date).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "courseName",
    header: "Session Type",
    cell: ({ row }) => <div className="">{row.original.courseName}</div>,
  },
  {
    accessorKey: "date",
    header: "Session Date",
    cell: ({ row }) => (
      <div className="">{moment(row.original.date).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Session Time",
    cell: ({ row }) => <div className="">{row.original.duration} Minutes</div>,
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => (
      <div className="">
        <Link
          to={`/$notesId/NoteDetail`}
          onClick={() => console.log(row.original)}
          params={{
            notesId: row.original.id.toString(),
          }}
        >
          <Button variant="link" className="-m-4 underline">
            View Notes
          </Button>
        </Link>
      </div>
    ),
  },
];

export function DashboardAppointmentsTable({
  data,
}: {
  data: AppointmentDetailV2[];
}) {
  const {
    eventContext: {
      setContextCoacheeId,
      setContextCoacheeName,
      setContextDate,
      setContextCourseId,
      setContextCourseName,
      setContextAppointmentId,
      setContextNotesId,
    },
  } = useCoachingContext();
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
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search coachee, notes, session"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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
                  onClick={() => {
                    console.log("row", row.original);
                    setContextAppointmentId(row.original.id);
                    setContextCoacheeId(row.original.coacheeId);
                    setContextCoacheeName(row.original.coacheeName);
                    setContextDate(row.original.date);
                    setContextCourseId(row.original.courseId);
                    setContextCourseName(row.original.courseName);
                    setContextNotesId(row.original.notesId || null);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2 text-black">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length} of{" "}
          {table.getFilteredRowModel().rows?.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
