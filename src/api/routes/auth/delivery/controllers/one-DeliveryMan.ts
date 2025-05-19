import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOneDeliveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("ID сан түрінде болуы керек")
        }
        const DeliveryMan = await prisma.deliveryMan.findFirst({
            where: {
                id,
            },
        })
        return DeliveryMan
            ? res.send(DeliveryMan)
            : res.status(404).json({ message: "Курьер табылмады" })
    } catch (error) {
        throw new Error(error)
    }
}
