import { Response, Request } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getAllDeliveryMans(req: Request, res: Response) {
    try {
        const DeliveryMans = await prisma.deliveryMan.findMany()
        res.send(DeliveryMans)
        return
    } catch (error) {
        throw new Error(error)
    }
}