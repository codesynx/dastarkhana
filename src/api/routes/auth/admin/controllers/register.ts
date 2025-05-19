import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

const RegisterAdminSchema = z.object({
    email: z.string().email("Жарамсыз электрондық пошта"),
    name: z.string().optional(),
    password: z.string().min(6, "Құпиясөз кемінде 6 таңбадан тұруы керек"),
});

export async function registerAdmin(req: Request, res: Response) {
    try {
        const { email, name, password } = RegisterAdminSchema.parse(req.body);

        const existingAdmin = await prisma.admin.findUnique({
            where: { email },
        });

        if (existingAdmin) {
            return res.status(400).json({ error: "Бұл электрондық поштамен әкімші тіркелген" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await prisma.admin.create({
            data: {
                email,
                name: name || "",
                password: hashedPassword,
            },
            select: { // Exclude password from the returned object
                id: true,
                email: true,
                name: true,
                createdAt: true,
            }
        });

        res.status(201).json(newAdmin);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors.map(
                    (err) => `${err.path.join(" / ")} ${err.message}`
                ),
            });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma errors if needed, e.g., unique constraint violation
            // Though the email check above should catch it for this specific case.
            res.status(400).json({ error: "Дерекқор қатесі: " + error.message });
        } else {
            console.error("Error during admin registration:", error);
            res.status(500).json({ error: "Ішкі сервер қатесі" });
        }
    }
}
