import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken"; // To get current admin ID from token

const DeleteAdminParamsSchema = z.object({
    id: z.string().refine((val) => !isNaN(parseInt(val, 10)), {
        message: "ID must be a number",
    }),
});

// Zod schema for JWT payload
const JwtPayloadSchema = z.object({
    id: z.number(),
});

export async function deleteAdmin(req: Request, res: Response) {
    try {
        const { id: idToDeleteParam } = DeleteAdminParamsSchema.parse(req.params);
        const adminIdToDelete = parseInt(idToDeleteParam, 10);

        // Get current admin ID from JWT token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Аутентификация қажет" });
        }
        const token = authHeader.split(" ")[1];
        
        let decodedTokenPayload;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
            decodedTokenPayload = JwtPayloadSchema.parse(decoded);
        } catch (jwtError) {
            return res.status(401).json({ error: "Жарамсыз немесе мерзімі өткен токен" });
        }
        
        const currentAdminId = decodedTokenPayload.id;

        if (currentAdminId === adminIdToDelete) {
            return res.status(403).json({ error: "Өзіңізді жоя алмайсыз." });
        }
        
        // Optional: Add a check to prevent deleting the last admin if desired
        // const adminCount = await prisma.admin.count();
        // if (adminCount <= 1) {
        //     return res.status(403).json({ error: "Соңғы әкімшіні жою мүмкін емес." });
        // }

        await prisma.admin.delete({
            where: { id: adminIdToDelete },
        });

        res.status(204).send(); // No content, successful deletion
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors.map(
                    (err) => `${err.path.join(" / ")} ${err.message}`
                ),
            });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') { // Record to delete not found
                return res.status(404).json({ error: "Жойылтын әкімші табылмады" });
            }
            res.status(400).json({ error: "Дерекқор қатесі: " + error.message });
        } else {
            console.error("Error deleting admin:", error);
            res.status(500).json({ error: "Ішкі сервер қатесі" });
        }
    }
}
