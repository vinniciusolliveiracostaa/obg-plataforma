import { z } from "zod";
import { SchoolSchema } from "@repo/schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { patchSchool } from "./schools-axios";
import { toast } from "sonner";

export default function SchoolDialog({
  item,
}: {
  item: z.infer<typeof SchoolSchema>;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updates = Object.fromEntries(formData.entries());

    try {
      await patchSchool(item.id, updates);
      toast.success("Escola atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a escola.");
      // Log Para depuração
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>Informações sobre a Escola.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <form
            id="school-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name">Escola</Label>
                  <Input id="name" name="name" defaultValue={item.name} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="inep">INEP</Label>
                  <Input id="inep" name="inep" defaultValue={item.inep} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={item.address}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" name="city" defaultValue={item.city} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="uf">UF</Label>
                    <Input id="uf" name="uf" defaultValue={item.uf} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" defaultValue={item.phone} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="administrativedependence">
                    Dependência Adm.
                  </Label>
                  <Input
                    id="administrativedependence"
                    name="administrativedependence"
                    defaultValue={item.administrativedependence}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="privatecategory">Cat. Privada</Label>
                  <Input
                    id="privatecategory"
                    name="privatecategory"
                    defaultValue={item.privatecategory}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="administrativecategory">Cat. Adm.</Label>
                  <Input
                    id="administrativecategory"
                    name="administrativecategory"
                    defaultValue={item.administrativecategory}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="publicpoweragreement">
                    Convenio com o Poder Público
                  </Label>
                  <Input
                    id="publicpoweragreement"
                    name="publicpoweragreement"
                    defaultValue={item.publicpoweragreement}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="regulation">Regulamentação</Label>
                  <Input
                    id="regulation"
                    name="regulation"
                    defaultValue={item.regulation}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="teachingmodalitystage">
                  Modalidade de Ensino
                </Label>
                <Input
                  id="teachingmodalitystage"
                  name="teachingmodalitystage"
                  defaultValue={item.teachingmodalitystage}
                />
              </div>
              <div>
                <Label htmlFor="otheroffers">Otras Ofertas</Label>
                <Input
                  id="otheroffers"
                  name="otheroffers"
                  defaultValue={item.otheroffers}
                />
              </div>
              <div>
                <Label htmlFor="size">Porte</Label>
                <Input id="size" name="size" defaultValue={item.size} />
              </div>
              <div>
                <Label htmlFor="servicerestriction">Restrição de Serviço</Label>
                <Input
                  id="servicerestriction"
                  name="servicerestriction"
                  defaultValue={item.servicerestriction}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={item.location}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="locatity">Localidade</Label>
                  <Input
                    id="locality"
                    name="locality"
                    defaultValue={item.locality}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    defaultValue={item.latitude}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    defaultValue={item.longitude}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button form="school-form" type="submit">
            Enviar
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Pronto</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
