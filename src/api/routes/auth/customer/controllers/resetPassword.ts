import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";



export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, code } = ResetPasswordSchema.parse(req.body);

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      return res.status(400).json({ error: "Электрондық пошта дұрыс емес" });
    }

    if (
      customer.resetCode !== code ||
      !customer.resetCodeExpiry ||
      new Date() > customer.resetCodeExpiry
    ) {
      return res.status(400).json({ error: "Қалпына келтіру коды жарамсыз немесе мерзімі өтіп кеткен" });
    }
    res.status(200).json({ message: "Код жарамды" });
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

const ResetPasswordSchema = z.object({
  email: z.string().email("Жарамсыз электрондық пошта"),
  code: z.string().min(4, "Қалпына келтіру коды 4 саннан тұруы керек").max(4, "Қалпына келтіру коды 4 саннан тұруы керек"),
});
