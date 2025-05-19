import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function deleteDeliveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID жарамды сан болуы керек" })
        }
        const deliveryMan = await prisma.deliveryMan.delete({
            where: { id },
        })
        return res.status(200).json({ message: "Курьер сәтті өшірілді" })
    } catch (error) {
        return res.status(500).json({ message: "Курьерді өшіру кезінде қате пайда болды", error: error.message })
    }
}
