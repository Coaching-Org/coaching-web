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
import { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCoachingContext } from "@/hooks/context";
import { AppointmentDetailV2 } from "@/interfaces";
import { ModalAppointment } from "../../(appointments)/-components/modal-appointment";
import { useLanguage } from "@/components/language.provider";
import { formatHour } from "@/lib";
import { ModalDeleteSession } from "@/shared";
import { BookUser, Eraser, LockKeyhole, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { useAppointmentsTableUtils } from "./appointments-table/appointments-table.utils";

export const createColumns = ({
  setIsOpenModal,
  setAppointmentData,
  setSessionId,
  setIsOpenModalDeleteSession,
}: {
  setIsOpenModal: (open: boolean) => void;
  setAppointmentData: (data: AppointmentDetailV2) => void;
  setSessionId: (id: string | number) => void;
  setIsOpenModalDeleteSession: (open: boolean) => void;
}): ColumnDef<AppointmentDetailV2>[] => {
  const { translations } = useLanguage();
  return [
    {
      id: "sessionName",
      accessorKey: "sessionName",
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
      cell: ({ row }) => (
        <div className="" style={{ width: "100px" }}>
          {formatHour(row.original.startDate)} -{" "}
          {formatHour(row.original.endDate)}
        </div>
      ),
    },
    {
      id: "sessionTime",
      accessorKey: "duration",
      header: translations.tables.header.sessionTime,
      cell: ({ row }) => (
        <div className="">
          {row.original.duration} {translations.tables.cell.minutesDuration}
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
              <DropdownMenuItem
                onClick={() => {
                  setIsOpenModal(true);
                  setAppointmentData(row.original);
                }}
              >
                <BookUser className="mr-2 h-4 w-4" />
                Detail
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSessionId(row.original.id);
                  setIsOpenModalDeleteSession(true);
                }}
              >
                <Eraser className="mr-2 h-4 w-4" />
                Delete Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
};

export function DashboardAppointmentsTable({
  data,
  setSearch,
  search,
}: {
  data: AppointmentDetailV2[];
  setSearch: (value: string) => void;
  search?: string;
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
    state: { isOpenModalDeleteSession, sessionId },
    event: { setIsOpenModalDeleteSession, setSessionId },
  } = useAppointmentsTableUtils();

  const table = useReactTable({
    data: data,
    columns: createColumns({
      setIsOpenModal,
      setAppointmentData,
      setSessionId,
      setIsOpenModalDeleteSession,
    }),
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
          placeholder={translations.placeholder.searchAppointments}
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
                    setContextAppointmentId(row.original.id);
                    setContextCoacheeId(row.original.coacheeId);
                    setContextCoacheeName(row.original.coacheeName);
                    setContextDate(row.original.date);
                    setContextCourseId(row.original.courseId);
                    setContextCourseName(row.original.courseName);
                    setContextNotesId(row.original.notesId || null);
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

      {/* Modal Delete Session */}
      <ModalDeleteSession
        isOpen={isOpenModalDeleteSession}
        onOpenChange={() => {
          setIsOpenModalDeleteSession(false);
        }}
        sessionId={sessionId}
      />
    </div>
  );
}
