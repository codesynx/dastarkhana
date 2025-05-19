import { prisma } from "@root/prisma/prisma";
import { Request, Response } from "express";
import { z } from "zod";

const GetOneAdminParamsSchema = z.object({
    id: z.string().refine((val) => !isNaN(parseInt(val, 10)), {
        message: "ID must be a number",
    }),
});

export async function getOneAdmin(req: Request, res: Response) {
    try {
        const { id } = GetOneAdminParamsSchema.parse(req.params);
        const adminId = parseInt(id, 10);

        const admin = await prisma.admin.findUnique({
            where: { id: adminId },
            select: { // Exclude password from the returned object
                id: true,
                email: true,
                name: true,
                createdAt: true,
            }
        });

        if (!admin) {
            return res.status(404).json({ error: "Әкімші табылмады" });
        }

        res.status(200).json(admin);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors.map(
                    (err) => `${err.path.join(" / ")} ${err.message}`
                ),
            });
        } else {
            console.error("Error fetching admin:", error);
            res.status(500).json({ error: "Ішкі сервер қатесі" });
        }
    }
}
