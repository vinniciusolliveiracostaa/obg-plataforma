import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MenuTogle } from "./menu-togle";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

const schools = [
  {
    inepCode: "33062501",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062502",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062503",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062504",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062505",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062506",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062507",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062508",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062509",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
  {
    inepCode: "33062510",
    name: "EM MARECHAL MASCARENHAS DE MORAES",
    ufCode: "RJ",
    country: "RIO DE JANEIRO",
    locality: "URBANA",
    administrativeCategory: "MUNICIPAL",
  },
];

export function ResultsSection() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] h-14">INEP</TableHead>
          <TableHead>NOME</TableHead>
          <TableHead>UF</TableHead>
          <TableHead>MUNICIPIO</TableHead>
          <TableHead>LOCALIDADE</TableHead>
          <TableHead>CATEGORIA ADIMINISTRATIVA</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schools.map((school) => (
          <TableRow key={school.inepCode}>
            <TableCell className="font-medium">{school.inepCode}</TableCell>
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.ufCode}</TableCell>
            <TableCell>{school.country}</TableCell>
            <TableCell>{school.locality}</TableCell>
            <TableCell>{school.administrativeCategory}</TableCell>
            <TableCell className="text-right">
              <Link
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground"
                href="/dashboard/admin/schools/editSchool"
              >
                <Ellipsis size={16} className="m-2" />
              </Link>
              <MenuTogle />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
