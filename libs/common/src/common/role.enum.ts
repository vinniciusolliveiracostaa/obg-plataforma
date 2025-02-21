export enum Role {
    // Funções principais
    STUDENT = "student", // Aluno que participa das provas
    TEACHER = "teacher", // Professor que gerencia equipes e alunos
    SCHOOL = "school", // Escola que pode adicionar professores e alunos
    ADMIN = "admin", // Administrador do sistema
  
    // Permissões extras (Roles)
    ELABORATOR = "elaborator", // Cria questões, mas não pode publicar
    REVIEWER = "reviewer", // Revisa e aprova provas, mas não pode publicar
    PUBLISHER = "publisher", // Publica provas revisadas
    PAYMENT_MANAGER = "payment_manager", // Gerencia pagamentos
    MANAGER = "manager", // Gestão da escola (mesmas permissões da escola)
  }
  