import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCoachingContext } from "@/hooks/context";
import { AppointmentDetailV2 } from "@/interfaces";
import { ModalAppointment } from "../../(appointments)/-components/modal-appointment";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/components/language.provider";
import { formatHour } from "@/lib";
import { NoteListDetail } from "@/interfaces/notes/get-notes.type";
import { ModalDeleteNote } from "@/shared";
import { useNotesTableUtils } from "./notes-table/notes-table.utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookUser, Eraser, MoreHorizontal } from "lucide-react";

export const createColumns = ({
  setIsOpenModalDeleteNote,
  setNotesId,
}: {
  setIsOpenModalDeleteNote: (open: boolean) => void;
  setNotesId: (id: string | number) => void;
}): ColumnDef<NoteListDetail>[] => {
  const { translations } = useLanguage();
  return [
    {
      id: "sessionName",
      accessorKey: "id",
      header: translations.tables.header.sessionName,
      cell: ({ row }) => <div className="">{row.original.sessionName}</div>,
    },
    {
      id: "sessionType",
      accessorKey: "courseName",
      header: translations.tables.header.sessionType,
      cell: ({ row }) => <div className="">{row.original.courseName}</div>,
    },
    {
      id: "sessionDate",
      accessorKey: "date",
      header: translations.tables.header.sessionDate,
      cell: ({ row }) => {
        return (
          <div className="text-center" style={{ width: "100px" }}>
            {row.original.appointmentStartDate &&
              formatHour(row.original.appointmentStartDate)}
            {" - "}
            {row.original.appointmentEndDate &&
              formatHour(row.original.appointmentEndDate)}
          </div>
        );
      },
    },
    {
      id: "sessionTime",
      accessorKey: "duration",
      header: translations.tables.header.sessionTime,
      cell: ({ row }) => (
        <div className="">
          {row.original.sessionTime} {translations.tables.cell.minutesDuration}
        </div>
      ),
    },
    {
      id: "id",
      accessorKey: "id",
      header: translations.tables.header.action,
      cell: ({ row }) => (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>
                <Link
                  to={`/$notesId/edit`}
                  onClick={() => console.log(row.original)}
                  params={{
                    notesId: row.original.id.toString(),
                  }}
                >
                  <Button variant="ghost" className="-m-4">
                    <BookUser className="mr-2 h-4 w-4" />
                    Detail
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setNotesId(row.original.id);
                  setIsOpenModalDeleteNote(true);
                }}
              >
                <Eraser className="mr-2 h-4 w-4" />
                Delete Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Link
            to={`/$notesId/edit`}
            onClick={() => console.log(row.original)}
            params={{
              notesId: row.original.id.toString(),
            }}
          >
            <Button variant="link" className="-m-4 underline">
              {translations.tables.cell.viewNotes}
            </Button>
          </Link> */}
        </div>
      ),
    },
  ];
};

export function NotesAppointmentTable({
  data,
  search,
  setSearch,
}: {
  data: NoteListDetail[];
  search: string;
  setSearch: (search: string) => void;
}) {
  const { translations } = useLanguage();
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentDetailV2>();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const {
    state: { isOpenModalDeleteNote, notesId },
    event: { setIsOpenModalDeleteNote, setNotesId },
  } = useNotesTableUtils();

  const table = useReactTable({
    data: data,
    columns: createColumns({ setIsOpenModalDeleteNote, setNotesId }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={translations.placeholder.searchNotes}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          {/* Render Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={`${headerGroup.id}-header-row`}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={`${header.id}-header-cell`}
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
                  key={`${row.id}-row`}
                  onClick={() => {
                    // setContextAppointmentId(row.original.id);
                    // setContextCoacheeId(row.original.coacheeId);
                    // setContextCoacheeName(row.original.coacheeName);
                    // setContextDate(row.original.date);
                    // setContextCourseId(row.original.courseId);
                    // setContextCourseName(row.original.courseName);
                    // setContextNotesId(row.original.notesId || null);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={`${cell.id}-cell`}
                        className="px-4 py-2 text-black"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {translations.tables.noData}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length} of{" "}
          {table.getFilteredRowModel().rows?.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {translations.tables.pagination.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {translations.tables.pagination.next}
          </Button>
        </div>
      </div>

      {/* Modal Section */}
      <ModalAppointment
        isOpen={isOpenModal}
        onOpenChange={setIsOpenModal}
        appointmentData={appointmentData as any}
      />

      {/* Modal Delete Note */}
      <ModalDeleteNote
        isOpen={isOpenModalDeleteNote}
        onOpenChange={() => setIsOpenModalDeleteNote(false)}
        notesId={notesId}
      />
    </div>
  );
}
