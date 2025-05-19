import { prisma } from "@root/prisma/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function signOutDeliveryMan(req: Request, res: Response) {
    try {
        // Extract the token from the authorization header
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ error: "Токен берілмеген" });
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

        // Find the delivery man using the decoded token's ID
        const DeliveryMan = await prisma.deliveryMan.findUnique({
            where: { id: decoded.id },
        });

        if (!DeliveryMan) {
            return res.status(404).json({ error: "Курьер табылмады" });
        }

        // Clear the token or instruct the client to do so
        res.clearCookie("token"); // Optional: if using cookies
        res.status(200).json({
            message: "Сәтті шықтыңыз",
            DeliveryMan: {
                id: DeliveryMan.id,
                name: DeliveryMan.name,
                phone: DeliveryMan.phone,
                createdAt: DeliveryMan.createdAt,
            },
        });
    } catch (error) {
        console.error(error);

        // Handle specific JWT errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Токен жарамсыз" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Токеннің мерзімі өтіп кеткен" });
        }

        res.status(500).json({ error: "Ішкі сервер қатесі" });
    }
}
