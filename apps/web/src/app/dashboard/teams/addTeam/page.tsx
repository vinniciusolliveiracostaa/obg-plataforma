import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const AddTeamPage: React.FC = () => {
  return (
    <div className="flex-1 px-4 py-8">
      <div className="flex h-16 justify-center items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Adicionar Equipe</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 mb-4">
              <TabsTrigger value="teamData" className="text-sm font-medium">Dados da Equipe</TabsTrigger>
              <TabsTrigger value="studentOneData" className="text-sm font-medium">Dados do Aluno 1</TabsTrigger>
              <TabsTrigger value="studentTwoData" className="text-sm font-medium">Dados do Aluno 2</TabsTrigger>
              <TabsTrigger value="studentThreeData" className="text-sm font-medium">Dados do Aluno 3</TabsTrigger>
            </TabsList>
            {/* Team Data */}
            <TabsContent value="teamData">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Dados da Equipe</CardTitle>
                  <CardDescription>Adicione as informações da equipe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Nome:</Label>
                    <Input placeholder="Digite o nome da equipe" />
                  </div>
                  <div>
                    <Label>Escola:</Label>
                    <Input type="text" placeholder="Digite o nome da escola" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* Student Data */}
            {["studentOneData", "studentTwoData", "studentThreeData"].map((tab, index) => (
              <TabsContent key={tab} value={tab}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Dados do Aluno {index + 1}</CardTitle>
                    <CardDescription>Adicione as informações pessoais do aluno {index + 1}.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>CPF:</Label>
                      <Input placeholder="Digite o CPF" />
                    </div>
                    <div>
                      <Label>Email:</Label>
                      <Input type="email" placeholder="Digite o email" />
                    </div>
                    <details className="mt-4 border-t pt-4">
                      <summary className="text-sm font-medium text-primary cursor-pointer">
                        Visualizar/Preencher outros dados deste estudante
                      </summary>
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label>Em Qual Série Está Matriculado:</Label>
                          <Input placeholder="Digite a série" />
                        </div>
                        <div>
                          <Label>Nome Completo:</Label>
                          <Input placeholder="Digite o nome completo" />
                        </div>
                        <div>
                          <Label>Nome Completo da Mãe:</Label>
                          <Input placeholder="Digite o nome completo da mãe" />
                        </div>
                        <div>
                          <Label>Data de Nascimento:</Label>
                          <Input placeholder="DD/MM/AAAA" />
                        </div>
                        <div>
                          <Label>Gênero:</Label>
                          <Input placeholder="Digite o gênero" />
                        </div>
                        <div>
                          <Label>Cor ou Raça:</Label>
                          <Input placeholder="Digite a cor ou raça" />
                        </div>
                        <div>
                          <Label>Pertence a alguma(s) dessas categorias:</Label>
                          <div className="space-y-2">
                            {["Indígenas", "Comunidade Ribeirinha", "População Negra", "Quilombolas", "Pessoa com Deficiência", "Outras Comunidades Tradicionais"].map(
                              (category) => (
                                <div key={category} className="flex items-center space-x-2">
                                  <Checkbox />
                                  <Label>{category}</Label>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </details>
                    <p className="mt-4 text-xs text-muted-foreground">Somente o CPF e E-mail são obrigatórios para o cadastro de um estudante. Os demais dados serão preenchidos pelo próprio estudante.</p>
                    <p className="mt-4 text-xs text-muted-foreground">Sera enviado um link para o estudante para preencher os dados pessoais.</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Salvar Alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AddTeamPage;
