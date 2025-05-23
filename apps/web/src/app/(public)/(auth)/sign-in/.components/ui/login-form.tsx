"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {AnimatePresence, motion} from "framer-motion";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";

import {useState} from "react";
import Link from "next/link";
import {redirect} from "next/navigation";

const emailSchema = z.object({
    email: z.string().email("Email inválido."),
});

const passwordSchema = z.object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

const codeSchema = z.object({
    code: z.string().length(6, "O código deve ter 6 dígitos."),
});

export function LoginForm() {
    const [step, setStep] = useState<number>(1);

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
        },
    });

    const codeForm = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: "",
        },
    });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
        // Valide o e-mail no backend (você deve implementar a verificação do e-mail)
        setStep(2);
        /*const emailExists = true; // Suponha que o e-mail existe
        if (emailExists) {
          setStep(2);
        } else {
          emailForm.setError("email", {
            type: "manual",
            message: "Email não encontrado",
          });
        }*/
    };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlePasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
        // Valide a senha no backend (você deve implementar a verificação da senha)
        setStep(3);
        /*const passwordIsValid = true; // Suponha que a senha está correta
        if (passwordIsValid) {
          setStep(3);
        } else {
          passwordForm.setError("password", {
            type: "manual",
            message: 'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para escolher outra.',
          });
        }*/
    };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCodeSubmit = async (values: z.infer<typeof codeSchema>) => {
        // Valide o código no backend (você deve implementar a verificação do código)
        redirect("/");
        /*const codeIsValid = true; // Suponha que o código está correto
        if (codeIsValid) {
          // Redirecione ou faça algo após o login bem-sucedido
          alert("Login bem-sucedido!");
        } else {
          codeForm.setError("code", {
            type: "manual",
            message: "Código incorreto",
          });
        }*/
    };

    return (
        <AnimatePresence>
            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="h-[25rem] w-[65rem] rounded-lg bg-card">
                        <div className="p-8 h-full w-full flex flex-row text-card-foreground">
                            <div className="flex flex-col w-1/2 h-full">
                                <div className="h-1/2 w-full flex items-start justify-center flex-col">
                                    <h2 className="text-4xl font-bold">Fazer Login</h2>
                                    <p className="text-base text-muted-foreground pr-11">
                                        Sign in to your account
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/2 h-full">
                                <Form {...emailForm}>
                                    <form
                                        className="h-full w-full"
                                        onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                                    >
                                        <div className="h-1/2 w-full pb-8 flex items-end justify-center">
                                            <div className="px-16 text-start text-base w-full">
                                                <FormField
                                                    control={emailForm.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className="text-sm font-semibold"
                                                                htmlFor=""
                                                            >
                                                                Digite seu email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="Seu Email"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <div className="flex flex-row justify-start items-center">
                                                                <FormMessage className="text-xs font-normal text-start" />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="h-1/2 flex flex-row justify-end items-end space-x-10">
                                            <Button
                                                className="font-semibold h-10 w-[6.375rem] text-sm"
                                                variant={"link"}
                                            >
                                                <Link href={"/register"}>Criar conta</Link>
                                            </Button>
                                            <Button
                                                className="font-semibold h-10 w-[6.375rem] text-sm rounded-[1.125rem]"
                                                type="submit"
                                            >
                                                Próximo
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="h-[25rem] w-[65rem] rounded-lg bg-card">
                        <div className="p-8 h-full w-full flex flex-row text-card-foreground">
                            <div className="flex flex-col w-1/2 h-full">
                                <div className="h-1/2 w-full flex items-start justify-center flex-col">
                                    <h2 className="text-4xl font-bold">Fazer Login</h2>
                                    <p className="text-base text-muted-foreground pr-11">
                                        Bem vindo de volta
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/2 h-full">
                                <Form {...passwordForm}>
                                    <form
                                        className="h-full w-full"
                                        onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                                    >
                                        <div className="h-1/2 w-full pb-8 flex items-end justify-center">
                                            <div className="px-16 text-start text-base w-full">
                                                <FormField
                                                    control={passwordForm.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className="text-sm font-semibold"
                                                                htmlFor=""
                                                            >
                                                                Digite sua senha
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="Sua Senha"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <div className="flex flex-row justify-start items-center">
                                                                <FormMessage className="text-xs font-normal text-start" />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="h-1/2 flex flex-row justify-end items-end space-x-10">
                                            <Button
                                                className="font-semibold h-10 w-[6.375rem] text-sm"
                                                variant={"link"}
                                            >
                                                <Link href={"/recovery"}>Esqueceu a senha?</Link>
                                            </Button>
                                            <Button
                                                className="font-semibold h-10 w-[6.375rem] text-sm rounded-[1.125rem]"
                                                type="submit"
                                            >
                                                Próximo
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="h-[25rem] w-[65rem] rounded-lg bg-card">
                        <div className="p-8 h-full w-full flex flex-row text-card-foreground">
                            <div className="flex flex-col w-1/2 h-full">
                                <div className="h-1/2 w-full flex items-start justify-center flex-col">
                                    <h2 className="text-4xl font-bold">Fazer Login</h2>
                                    <p className="text-base text-muted-foreground pr-11">
                                        Sign in to your account
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/2 h-full">
                                <Form {...codeForm}>
                                    <form
                                        className="h-full w-full"
                                        onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
                                    >
                                        <div className="h-1/2 w-full pb-8 flex items-end justify-center">
                                            <div className="px-16 text-start text-base w-full">
                                                <FormField
                                                    control={codeForm.control}
                                                    name="code"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className="text-sm font-semibold"
                                                                htmlFor=""
                                                            >
                                                                Digite o código
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    placeholder="Código"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <div className="flex flex-row justify-start items-center">
                                                                <FormMessage className="text-xs font-normal text-start" />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="h-1/2 flex flex-row justify-end items-end space-x-10">
                                            <Button
                                                className="font-semibold h-10 w-[6.375rem] text-sm bg-transparent hover:bg-transparent text-primary/90 hover:text-primary shadow-none"
                                            >
                                                Enviar novamente
                                            </Button>
                                            <Button
                                                className="font-semibold h-10 w-[6.375rem] text-sm rounded-[1.125rem]"
                                                type="submit"
                                            >
                                                Próximo
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}