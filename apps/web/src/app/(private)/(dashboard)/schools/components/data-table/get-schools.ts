import {
  schoolsResponseSchema,
  SchoolsResponseSchemaType,
} from "@repo/schemas";

export async function getSchools(
  page: number,
  pageSize: number,
): Promise<SchoolsResponseSchemaType> {
  const res = await fetch(
    `http://localhost:8000/schools?page=${page}&pageSize=${pageSize}`,
  );

  if (!res.ok) {
    throw new Error("FAILED_TO_FETCH_SCHOOLS");
  }

  const data = await res.json();

  // validação com zod
  return schoolsResponseSchema.parse(data);
}
