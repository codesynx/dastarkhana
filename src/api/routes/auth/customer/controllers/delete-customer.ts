import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"
export async function deleteCustomer(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (!id) {
            throw new Error("Id сан түрінде болуы керек");
        }
        const deletedCustomer = await prisma.customer.delete({
            where: { id },
        });
        return res.send(deletedCustomer);
    } catch (error) {
        throw new Error(error);
    }
}
