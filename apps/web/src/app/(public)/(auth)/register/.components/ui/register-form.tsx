/*"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

const emailSchema = z.object({
  email: z.string().email("Email inválido."),
});

const passwordSchema = z.object({
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

const codeSchema = z.object({
  code: z.string().length(6, "O código deve ter 6 dígitos."),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const telSchema = z.object({
  tel: z.string().regex(phoneRegex, "Numero Invalido"),
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

  const telForm = useForm<z.infer<typeof telSchema>>({
    resolver: zodResolver(telSchema),
    defaultValues: {
      tel: "",
    },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    const emailExists = true;

    if (emailExists) {
      setStep(2);
    } else {
      emailForm.setError("email", {
        type: "manual",
        message: "Email não encontrado",
      });
    }
  };

  const handlePasswordSubmit = async (
    values: z.infer<typeof passwordSchema>
  ) => {
    // Valide a senha no backend (você deve implementar a verificação da senha)
    setStep(3);
    const passwordIsValid = true; // Suponha que a senha está correta
    if (passwordIsValid) {
      setStep(3);
    } else {
      passwordForm.setError("password", {
        type: "manual",
        message:
          'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para escolher outra.',
      });
    }
  };

  const handleTelSubmit = async (values: z.infer<typeof telSchema>) => {
    const telIsValid = true;

    if (telIsValid) {
      setStep(2);
    } else {
      telForm.setError("tel", {
        type: "manual",
        message: "Telefone invalido",
      });
    }
  };

  const handleCodeSubmit = async (values: z.infer<typeof codeSchema>) => {
    const codeIsValid = true; // Suponha que o código está correto
    if (codeIsValid) {
      // Redirecione ou faça algo após o login bem-sucedido
      alert("Login bem-sucedido!");
    } else {
      codeForm.setError("code", {
        type: "manual",
        message: "Código incorreto",
      });
    }
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
        ></motion.div>
      )}
      {step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 4 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 5 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 6 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 7 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 8 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {step === 9 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transitionEnd: { display: "none" } }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
*/