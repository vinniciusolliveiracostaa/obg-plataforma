"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function MenuTogle() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 size={16} className="m-2 hover:text-destructive-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Professor</DialogTitle>
            <DialogDescription>
              Essa ação é irreversível. Deseja realmente excluir este professor?
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={16} className="m-2 hover:text-destructive-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir Professor</DialogTitle>
          <DialogDescription>
            Essa ação é irreversível. Deseja realmente excluir este professor?
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );

}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-1.5">
        <Label htmlFor="destructiveTeacher">Para confirmar, digite "JOSE ALFREDO DE SOUSA" na caixa abaixo</Label>
        <Input className="bg-muted border-destructive focus:border-destructive-foreground" id="destructiveTeacher" required={true} type="text" />
      </div>
      <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8" type="submit">Excluir esta escola</Button>
    </form>
  );
}