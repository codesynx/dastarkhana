import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOneCategory(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("Id сан түрінде болуы керек")
        }
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
            include: {
                products: true,
            },
        })
        return category
            ? res.send(category)
            : res.status(404).json({ message: "Табылмады" })
    } catch (error) {
        throw new Error(error)
    }
}
