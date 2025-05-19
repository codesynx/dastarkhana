import { prisma } from "@root/prisma/prisma";
import { Request, Response } from "express";

export async function getAllAdmins(req: Request, res: Response) {
    try {
        const admins = await prisma.admin.findMany({
            select: { // Exclude password from the returned objects
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc', // Optional: order by creation date
            }
        });
        res.status(200).json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ error: "Ішкі сервер қатесі" });
    }
}
