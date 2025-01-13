import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const EditSchoolsPage: React.FC = () => {
  return (
    <div className="flex-1">
        <div className="flex h-16 justify-center items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Editar Escola</h1>
        </div>
        <div className="flex justify-center items-center">
          <Tabs defaultValue="basic" className="w-[800px]">
            {/* Tabs Navigation */}
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="location">Localização</TabsTrigger>
              <TabsTrigger value="administrative">Dados Administrativos</TabsTrigger>
              <TabsTrigger value="other">Outras Informações</TabsTrigger>
            </TabsList>
            {/* Informações Básicas */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>Edite as informações básicas da escola.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Código INEP:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>UF:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Município:</Label>
                    <Input />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* Localização */}
            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle>Localização</CardTitle>
                  <CardDescription>Atualize os dados de localização da escola.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Localização:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Localidade:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Endereço:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Latitude:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitude:</Label>
                    <Input />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* Dados Administrativos */}
            <TabsContent value="administrative">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Administrativos</CardTitle>
                  <CardDescription>Gerencie as informações administrativas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Categoria Administrativa:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Dependência Administrativa:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria Privada:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Conveniado Poder Público:</Label>
                    <Input />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* Outras Informações */}
            <TabsContent value="other">
              <Card>
                <CardHeader>
                  <CardTitle>Outras Informações</CardTitle>
                  <CardDescription>Adicione informações adicionais da escola.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Restrição Atendimento:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Regulamentação:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Porte:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Etapa e Modalidade de Ensino:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Outras Ofertas:</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone:</Label>
                    <Input />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};

export default EditSchoolsPage;
