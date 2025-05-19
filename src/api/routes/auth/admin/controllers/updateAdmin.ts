import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const UpdateAdminParamsSchema = z.object({
    id: z.string().refine((val) => !isNaN(parseInt(val, 10)), {
        message: "ID must be a number",
    }),
});

const UpdateAdminBodySchema = z.object({
    email: z.string().email("Жарамсыз электрондық пошта").optional(),
    name: z.string().optional(),
    // Password updates should be handled by a separate, more secure endpoint
    // e.g., requiring current password or a reset flow.
});

export async function updateAdmin(req: Request, res: Response) {
    try {
        const { id } = UpdateAdminParamsSchema.parse(req.params);
        const adminId = parseInt(id, 10);
        const updateData = UpdateAdminBodySchema.parse(req.body);

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "Жаңарту үшін деректер жоқ" });
        }

        // If email is being updated, check if it's already taken by another admin
        if (updateData.email) {
            const existingAdminWithEmail = await prisma.admin.findFirst({
                where: {
                    email: updateData.email,
                    NOT: {
                        id: adminId,
                    },
                },
            });
            if (existingAdminWithEmail) {
                return res.status(400).json({ error: "Бұл электрондық поштамен басқа әкімші тіркелген" });
            }
        }

        const updatedAdmin = await prisma.admin.update({
            where: { id: adminId },
            data: updateData,
            select: { // Exclude password from the returned object
                id: true,
                email: true,
                name: true,
                createdAt: true,
            }
        });

        res.status(200).json(updatedAdmin);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors.map(
                    (err) => `${err.path.join(" / ")} ${err.message}`
                ),
            });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') { // Record to update not found
                return res.status(404).json({ error: "Жаңартылатын әкімші табылмады" });
            }
            res.status(400).json({ error: "Дерекқор қатесі: " + error.message });
        } else {
            console.error("Error updating admin:", error);
            res.status(500).json({ error: "Ішкі сервер қатесі" });
        }
    }
}
