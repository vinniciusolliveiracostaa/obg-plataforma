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

const teachers = [
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-00",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-01",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-02",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-03",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-04",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-05",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-06",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-07",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-08",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
  {
    name: "JOSE ALFREDO DE SOUSA",
    cpf: "123.456.789-09",
    sex: "MASCULINO",
    color: "PRETA",
    categories: "QUILOMBOLA",
    tel: "+55(88) 99999-9999",
    email: "teste@teste.com",
  },
];

export function ResultsSection() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NOME</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>SEX</TableHead>
          <TableHead>COR</TableHead>
          <TableHead>CATEGORIAS</TableHead>
          <TableHead>TELEFONE</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.cpf}>
          <TableCell>{teacher.name}</TableCell>
          <TableCell>{teacher.cpf}</TableCell>
          <TableCell>{teacher.sex}</TableCell>
          <TableCell>{teacher.color}</TableCell>
          <TableCell>{teacher.categories}</TableCell>
          <TableCell>{teacher.tel}</TableCell>
          <TableCell>{teacher.email}</TableCell>
          <TableCell className="text-right">
            <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground" href="/dashboard/teachers/editTeacher">
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
