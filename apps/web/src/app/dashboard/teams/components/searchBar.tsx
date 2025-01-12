import * as React from "react";
import { Filter, Search } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  placeholder: string;
};

const Input2 = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-full w-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const FilterDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center">
        <Filter className="text-muted" size={20} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros de Busca</DrawerTitle>
          <DrawerDescription>
            Use os filtros abaixo para fazer sua busca
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <form className="p-4">
            <div className="grid gap-6">
              {/* Grupo 1: Identificação */}
              <div className="grid gap-4">
                <h2 className="text-lg font-semibold">Identificação</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="inepCode">Nome</Label>
                    <Input id="inepCode" placeholder="Digite o nome do professor" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">CPF</Label>
                    <Input id="name" placeholder="digite o CPF" />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <Button>Filtrar</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="h-12 w-full max-w-xl border border-input rounded-lg flex justify-center items-center">
      <div className="p-2">
        <Search size={20} />
      </div>
      <Input2 type="search" placeholder={placeholder} />
      <div className="p-2 bg-primary h-full rounded-r-lg flex justify-center items-center">
        <FilterDrawer />
      </div>
    </div>
  );
};

export { SearchBar };
