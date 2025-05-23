import { z } from "zod";
import { schoolSchema } from "@obg/schemas";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function TableCellViewer({
  item,
}: {
  item: z.infer<typeof schoolSchema>;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.name}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gep-1">
          <SheetTitle>{item.name}</SheetTitle>
          <SheetDescription>Mostrando Informações da escola</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={item.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="inep">INEP</Label>
                <Input id="inep" defaultValue={item.inep} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" defaultValue={item.uf} />
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
