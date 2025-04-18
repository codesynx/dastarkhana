import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOneDileveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("ID сан түрінде болуы керек")
        }
        const DileveryMan = await prisma.dileveryMan.findFirst({
            where: {
                id,
            },
        })
        return DileveryMan
            ? res.send(DileveryMan)
            : res.status(404).json({ message: "Курьер табылмады" })
    } catch (error) {
        throw new Error(error)
    }
}
