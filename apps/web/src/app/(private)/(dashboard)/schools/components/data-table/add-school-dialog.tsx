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
import { PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

export default function AddSchoolDialog() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon />
          <span className="hidden lg:inline">Adicionar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-1">
          <AddSchool />
          <AddSchoolCsv />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddSchool() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left text-foreground"
        >
          Manualmente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full">
        <DialogHeader>
          <DialogTitle>Adicionar Escola</DialogTitle>
          <DialogDescription>Adicionar Escola Manualmente.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <form
            id="school-form"
            //onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name">Escola</Label>
                  <Input id="name" name="name" />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="inep">INEP</Label>
                  <Input id="inep" name="inep" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" name="address" />
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" name="city" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="uf">UF</Label>
                    <Input id="uf" name="uf" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" />
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
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="privatecategory">Cat. Privada</Label>
                  <Input id="privatecategory" name="privatecategory" />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="administrativecategory">Cat. Adm.</Label>
                  <Input
                    id="administrativecategory"
                    name="administrativecategory"
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
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="regulation">Regulamentação</Label>
                  <Input id="regulation" name="regulation" />
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
                />
              </div>
              <div>
                <Label htmlFor="otheroffers">Outras Ofertas</Label>
                <Input id="otheroffers" name="otheroffers" />
              </div>
              <div>
                <Label htmlFor="size">Porte</Label>
                <Input id="size" name="size" />
              </div>
              <div>
                <Label htmlFor="servicerestriction">Restrição de Serviço</Label>
                <Input id="servicerestriction" name="servicerestriction" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="location">Localização</Label>
                  <Input id="location" name="location" />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="locatity">Localidade</Label>
                  <Input id="locality" name="locality" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" name="latitude" />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" name="longitude" />
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
function AddSchoolCsv() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-center text-center text-foreground"
        >
          CSV
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar CSV</DialogTitle>
          <DialogDescription>
            Adicionar escola via arquivo csv.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <form id="add-school-csv-form" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="input-csv">CSV</Label>
                <Input id="input-csv" name="input-csv" type="file" />
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
