import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

//@DESC     place order associated with user
//@ROUTE    POST /api/agentify/order/place/order/:userId
//@ACCESS   private
const placeOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { ahenteId, status, createdAt } = req.body;

  console.log(ahenteId, status, createdAt);

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  const user = prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) {
    return res.status(400).json({ message: "The user does not exist" });
  }

  try {
    const placeNewOrder = await prisma.orders.create({
      data: {
        status: status,
        createdAt: new Date(createdAt),
        placeOrderBy: {
          connect: {
            id: parseInt(id),
          },
        },
        ordersDesignatedTo: {
          connect: {
            id: parseInt(ahenteId),
          },
        },
      },
    });

    return res
      .status(201)
      .json({ message: `Place order ${placeNewOrder.createdAt}` });
  } catch (error) {
    console.log(error);
  }
});

export default { placeOrder };
