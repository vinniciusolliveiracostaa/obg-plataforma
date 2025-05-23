import { ColumnDef } from "@tanstack/react-table";
import { SchoolSchemaType } from "@repo/schemas";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import SchoolDialog from "./school-dialog";

export const columns: ColumnDef<SchoolSchemaType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="ml-1 mr-1 flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Escola",
    // cell: ({ row }) => {
    //   return <TableCellViewer item={row.original} />;
    // },
    cell: ({ row }) => {
      return <SchoolDialog item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "inep",
    header: "INEP",
  },
  {
    accessorKey: "uf",
    header: "UF",
  },
  {
    accessorKey: "city",
    header: "Cidade",
  },
  {
    accessorKey: "location",
    header: "Localização",
  },
  {
    accessorKey: "locality",
    header: "Localidade",
  },
  {
    accessorKey: "administrativecategory",
    header: "Categoria Administrativa",
  },
  {
    accessorKey: "servicerestriction",
    header: "Restrição de Serviço",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "administrativedependence",
    header: "Dependência Administrativa",
  },
  {
    accessorKey: "privatecategory",
    header: "Categoria Privada",
  },
  {
    accessorKey: "publicpoweragreement",
    header: "Convenio com o Poder Público",
  },
  {
    accessorKey: "regulation",
    header: "Regulamentação",
  },
  {
    accessorKey: "size",
    header: "Porte",
  },
  {
    accessorKey: "teachingmodalitystage",
    header: "Modalidade de Ensino",
  },
  {
    accessorKey: "otheroffers",
    header: "Otras Ofertas",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
];
