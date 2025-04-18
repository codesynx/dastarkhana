import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginCustomer(req: Request, res: Response) {
    try {
        const { phone, password } = LoginSchema.parse(req.body);
        const customer = await prisma.customer.findUnique({
            where: { phone },
        });

        if (!customer) {
            return res.status(400).json({ error: "Телефон нөмірі немесе құпиясөз қате" });
        }
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Телефон нөмірі немесе құпиясөз қате" });
        }

        const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET || "secretKey");

        res.status(200).json({ token });
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

const LoginSchema = z.object({
    phone: z.string().min(1, "Телефон нөмірі міндетті"),
    password: z.string().min(6, "Құпиясөз кемінде 6 таңбадан тұруы керек"),
});
