import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getOrdersByDeliveryManId = async (req: Request, res: Response) => {
  const { deliveryManId } = req.params;

  // Vérifier si deliveryManId est valide
  if (!deliveryManId) {
    return res.status(400).json({ error: "Курьер ID-сы міндетті" });
  }

  try {
    // Récupérer les commandes pour le livreur spécifique
    const orders = await prisma.order.findMany({
      where: {
        deliveryManId: parseInt(deliveryManId), // Assurez-vous que deliveryManId est un entier
      },
      include: {
        customer: true, // Inclut les détails du client
        deliveryMan: true, // Inclut les détails du livreur
        orderItems: {
          include: {
            product: true, // Inclut les détails des produits dans les items de commande
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Курьер ID-сы бойынша тапсырыстарды алу кезінде қате шықты:", error);
    res.status(500).json({ error: "Курьер ID-сы бойынша тапсырыстарды алу кезінде қате шықты" });
  } finally {
    await prisma.$disconnect();
  }
};
