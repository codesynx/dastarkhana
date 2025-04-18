import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";


async function updatePassword(email: string, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.customer.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetCode: null,
      resetCodeExpiry: null,
    },
  });
}

export async function changePassword(req: Request, res: Response) {
  const ChangePasswordSchema = z.object({
    email: z.string().email("Жарамсыз электрондық пошта"),
    newPassword: z.string().min(6, "Жаңа құпиясөз кемінде 6 таңбадан тұруы керек"),
  });

  try {
    const { email, newPassword } = ChangePasswordSchema.parse(req.body);

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      return res.status(404).json({ error: "Тапсырыс беруші табылмады" });
    }

    await updatePassword(email, newPassword);
    
    res.status(200).json({ message: "Құпиясөз сәтті өзгертілді" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        errors: error.errors.map(
          (err) => `${err.path.join(" / ")} ${err.message}`
        ),
      });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Ішкі сервер қатесі" });
    }
  }
}
