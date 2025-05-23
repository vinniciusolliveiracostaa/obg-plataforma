import {
  schoolSchema,
  SchoolsResponse,
  schoolsResponseSchema,
} from "@obg/schemas";
import axios from "axios";
import { z } from "zod";

// Configuração base do axios
const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
});

// GET: lista de escolas com paginação
export async function getSchools(
  page: number,
  pageSize: number,
): Promise<SchoolsResponse> {
  const res = await api.get("/schools", {
    params: {
      page,
      pageSize,
    },
  });

  // validação com zod
  return schoolsResponseSchema.parse(res.data);
}

// PATCH: atualiza uma escola
export async function patchSchool(
  id: string,
  updates: Partial<z.infer<typeof schoolSchema>>,
): Promise<z.infer<typeof schoolSchema>> {
  const res = await api.patch(`/schools/${id}`, updates);

  // validação com zod
  return schoolSchema.parse(res.data);
}

// POST: cria uma escola
export async function createSchool(
  data: z.infer<typeof schoolSchema>,
): Promise<z.infer<typeof schoolSchema>> {
  const res = await api.post("/schools", data);

  // validação com zod
  return schoolSchema.parse(res.data);
}

// POST: importa escolas de um arquivo CSV
export async function importSchools(
  file: File,
): Promise<{ message: string; fileId: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/schools/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
