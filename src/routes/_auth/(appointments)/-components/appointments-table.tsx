import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Appointment } from "@/interfaces/appointment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

const tempAppointments = [
  {
    id: 1,
    coacheeId: 1,
    coachId: 2,
    courseId: 1,
    coacheeName: "Tatas Fachrul",
    coachName: "Marcel",
    courseName: "Professional Coaching",
    status: "confirm",
    createdAt: new Date(),
    date: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    coacheeId: 2,
    coachId: 2,
    courseId: 1,
    coacheeName: "Iwan",
    coachName: "Marcel",
    courseName: "Professional Coaching",
    status: "confirm",
    createdAt: new Date(),
    date: new Date(),
    updatedAt: new Date(),
  },
];

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "coachName",
    header: "Coach",
    cell: ({ row }) => (
      <div className="capitalize flex flex-row items-center gap-2">
        {/* Padding text to table 20 */}
        {row.original.coachName}
      </div>
    ),
  },
  {
    accessorKey: "coacheeName",
    header: "Coachee",
    cell: ({ row }) => (
      <div className="capitalize flex flex-row items-center gap-2">
        {row.original.coacheeName}
      </div>
    ),
  },
  {
    accessorKey: "courseName",
    header: "Session Type",
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("courseName")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;

      // Format the ISO string to dd-mm-yyyy hh:mm
      const formatted = new Date(date)
        .toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", "");

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          {
            "text-primary": row.getValue("status") === "completed",
            "text-yellow-500": row.getValue("status") === "in-progress",
            "text-red-500": row.getValue("status") === "pending",
          },
          "capitalize"
        )}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  // {
  //   id: 'actions',
  //   cell: ({row}) => <AppointmentsTableAction product={row.original} />,
  // },
];

export function AppointmentsTable({ navigate }: { navigate: () => void }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: tempAppointments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search coachee, notes, session"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={navigate}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
