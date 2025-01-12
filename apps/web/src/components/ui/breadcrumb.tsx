"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

const Breadcrumb: React.FC = () => {
  const segments = useSelectedLayoutSegments();

  // Definir quais segmentos são páginas válidas
  const validPages: Set<string> = new Set([
    "dashboard",
    "settings",
    "certificates",
    "graphicsAnswers",
    "teamsResults",
    "schools",
    "teams",
    "teachers",
    "students",
  ]);

  // Mapeamento de nomes amigáveis para os segmentos
  const segmentMap: Record<string, string> = {
    dashboard: "Home",
    admin: "Administrador",
    certificates: "Certificados",
    reports: "Relatórios",
    graphicsAnswers: "Gráficos de Respostas",
    teamsResults: "Resultados das Equipes",
    schools: "Escolas",
    editSchool: "Editar Escola",
    addSchool: "Adicionar Escola",
    addSchoolCSV: "Importar Escola por CSV",
    teachers: "Professores",
    editTeacher: "Editar Professor",
    addTeacher: "Adicionar Professor",
    teams: "Equipes",
    editTeam: "Editar Equipe",
    addTeam: "Adicionar Equipe",
    students: "Alunos",
    editStudent: "Editar Aluno",
    addStudent: "Adicionar Aluno",
  };

  // Construir os breadcrumbs
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/dashboard/" + segments.slice(0, index + 1).join("/");
    const label = segmentMap[segment] || segment;

    const isPage = validPages.has(segment);

    return (
      <React.Fragment key={href}>
        <li>
          {isPage ? (
            <Link
              className="text-sm text-muted-foreground hover:text-foreground"
              href={href}
            >
              {label}
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              {label}
            </span>
          )}
        </li>
        {index < segments.length - 1 && (
          <li className="[&>svg]:w-3.5 [&>svg]:h-3.5">
            <ChevronRight />
          </li>
        )}
      </React.Fragment>
    );
  });

  return (
    <nav aria-label="Breadcrumb">
      <ul className="flex flex-row items-center gap-2">
        <li>
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/dashboard"
          >
            Home
          </Link>
        </li>
        <li className="[&>svg]:w-3.5 [&>svg]:h-3.5">
          <ChevronRight />
        </li>
        {breadcrumbs}
      </ul>
    </nav>
  );
};

export { Breadcrumb };
