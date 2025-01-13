
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Button, buttonVariants } from "@/components/ui/button";
  import { Plus } from "lucide-react";
import Link from "next/link";
  
  const AddSchool = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <Button className="h-12 w-12 flex justify-center items-center rounded-full">
            <Plus size={28} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Adicionar Escola
            </h3>
            <p className="text-sm">
              Escolha como deseja adicionar a escola.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/admin/schools/addSchool" className={buttonVariants({ variant: "outline" })}>Manualmente</Link>
            <Link href="/dashboard/admin/schools/addSchoolCSV" className={buttonVariants({ variant: "outline" })}>Importar por CSV</Link>
          </div>
        </PopoverContent>
      </Popover>
    );
  };
  
  export default AddSchool;
  