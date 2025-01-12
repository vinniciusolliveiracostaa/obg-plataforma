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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const EditTeacherPage: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex h-16 justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Editar Aluno</h1>
      </div>
      <div className="flex justify-center items-center">
        <Tabs defaultValue="basic" className="w-[800px]">
          {/* Tabs Navigation */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Basicas</TabsTrigger>
            <TabsTrigger value="complementary">
              Informações Complementares
            </TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
          </TabsList>

          {/* Dados Pessoais */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Informações Basicas</CardTitle>
                <CardDescription>
                  Edite as informações pessoais do aluno.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome Completo:</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>CPF:</Label>
                  <Input type="text" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail:</Label>
                  <Input type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Senha:</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Celular:</Label>
                  <Input type="tel" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Informações Complementares */}
          <TabsContent value="complementary">
            <Card>
              <CardHeader>
                <CardTitle>Informações Complementares</CardTitle>
                <CardDescription>
                  Edite as informações complementares do aluno.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Em Qual Série Está Matriculado:</Label>
                  <Input placeholder="Digite a série" />
                </div>
                <div className="space-y-2">
                  <Label>Nome Completo da Mãe:</Label>
                  <Input placeholder="Digite o nome completo da mãe" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Nascimento:</Label>
                  <Input placeholder="DD/MM/AAAA" />
                </div>
                <div className="space-y-2">
                  <Label>Gênero:</Label>
                  <Input placeholder="Digite o gênero" />
                </div>
                <div className="space-y-2">
                  <Label>Cor ou Raça:</Label>
                  <Input placeholder="Digite a cor ou raça" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Categorias */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
                <CardDescription>
                  Selecione as categorias aplicáveis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="indigenas" />
                    <Label htmlFor="indigenas">Indígenas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ribeirinha" />
                    <Label htmlFor="ribeirinha">Comunidade Ribeirinha</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="negra" />
                    <Label htmlFor="negra">População Negra</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quilombolas" />
                    <Label htmlFor="quilombolas">Quilombolas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="deficiencia" />
                    <Label htmlFor="deficiencia">Pessoa com Deficiência</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="outras" />
                    <Label htmlFor="outras">
                      Outras Comunidades Tradicionais
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Categorias</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditTeacherPage;
