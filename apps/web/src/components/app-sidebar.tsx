"use client"
import * as React from "react"
import {
  ChartLine,
  GalleryVerticalEnd,
  GraduationCap,
  School2,
  Users2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "OBG",
      logo: GalleryVerticalEnd,
      role: "Administrador",
    }
  ],
  projects: [
    {
      name: "Escolas",
      url: "/dashboard/schools",
      icon: School2,
    },
    {
      name: "Professores",
      url: "/dashboard/teachers",
      icon: GraduationCap,
    },
    {
      name: "Equipes",
      url: "/dashboard/teams",
      icon: Users2,
    },
  ],
  navMain: [
    {
      title: "Relatorios",
      url: "/dashboard/reports",
      icon: ChartLine,
      isActive: false,
      items: [
        {
          title: "Equipes",
          url: "/dashboard/reports/teams",
        },
        {
          title: "Pontuações",
          url: "/dashboard/reports/scores",
        },
        {
          title: "Gráficos de Responstas",
          url: "/dashboard/reports/graphicsAnswers",
        },
        {
          title: "Resultados por Equipe",
          url: "/dashboard/reports/teamsResults",
        },
        {
          title: "Certificados",
          url: "/dashboard/reports/certificates",
        }
      ]
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
