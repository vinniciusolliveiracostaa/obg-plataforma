
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Button, buttonVariants } from "@/components/ui/button";
  import { Plus } from "lucide-react";
import Link from "next/link";
  
  const AddTeam = () => {
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
              Adicionar Equipe
            </h3>
            <p className="text-sm">
              Escolha como deseja adicionar um equipe.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/admin/teams/addTeam" className={buttonVariants({ variant: "outline" })}>Manualmente</Link>
          </div>
        </PopoverContent>
      </Popover>
    );
  };
  
  export default AddTeam;
  