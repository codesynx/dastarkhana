import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOneCustomer(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("Id сан түрінде болуы керек")
        }
        const customer = await prisma.customer.findFirst({
            where: {
                id,
            },
        })
        return customer
            ? res.send(customer)
            : res.status(404).json({ message: "Пайдаланушы табылмады" })
    } catch (error) {
        throw new Error(error)
    }
}
