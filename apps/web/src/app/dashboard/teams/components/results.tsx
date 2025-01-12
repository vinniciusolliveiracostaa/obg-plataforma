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
import { count } from "console";

const teams = [
  {
    id: 1,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 2,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 3,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 4,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 5,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 6,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 7,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 8,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 9,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
  {
    id: 10,
    number: "34439",
    name: "Equipe 1",
    school: "EM MARECHAL MASCARENHAS DE MORAES",
    city: "RIO DE JANEIRO",
    ufCode: "RJ",
    status: "AGUARDANDO PAGAMENTO",
  },
];

export function ResultsSection() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NUMERO</TableHead>
          <TableHead>NOME</TableHead>
          <TableHead>ESCOLA</TableHead>
          <TableHead>MUNICIPIO</TableHead>
          <TableHead>UF</TableHead>
          <TableHead>STAUS</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((teams) => (
          <TableRow key={teams.id}>
          <TableCell>{teams.number}</TableCell>
          <TableCell>{teams.name}</TableCell>
          <TableCell>{teams.school}</TableCell>
          <TableCell>{teams.city}</TableCell>
          <TableCell>{teams.ufCode}</TableCell>
          <TableCell>{teams.status}</TableCell>
          <TableCell className="text-right">
            <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground" href="/dashboard/teams/editTeam">
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
