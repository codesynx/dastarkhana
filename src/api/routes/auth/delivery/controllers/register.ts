import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function registerDeliveryMan(req: Request, res: Response) {
    try {
        const { phone, name,salary, password } = DeliveryManSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        const DeliveryMan = await prisma.deliveryMan.create({
            data: {
                phone,
                name,
                salary,
                password: hashedPassword,
            },
        });

        res.status(201).json(DeliveryMan);
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
const DeliveryManSchema = z.object({
    phone: z.string().min(1, "Телефон нөмірі міндетті"),
    name: z.string().optional(),
    salary: z.number().min(0,"Жалақы дұрыс емес"),
    password: z.string().min(6, "Құпиясөз кемінде 6 таңбадан тұруы керек"),
});
