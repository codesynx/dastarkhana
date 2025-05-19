import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"
export async function updateDeliveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (!id) {
            throw new Error("ID сан түрінде болуы керек");
        }
        const updatedDeliveryMan = await prisma.deliveryMan.update({
            where: { id },
            data: req.body,
        });
        return res.send(updatedDeliveryMan);
    } catch (error) {
        throw new Error(error);
    }
}
