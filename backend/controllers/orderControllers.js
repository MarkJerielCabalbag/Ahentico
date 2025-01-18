import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

//@DESC     place order associated with user
//@ROUTE    POST /api/agentify/order/place/:userId
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

//@DESC     place products associated with the order
//@ROUTE    POST /api/agentify/order/items/:orderId
//@ACCESS   private
const orderItems = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const { productId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  const placeOrder = await prisma.orders.findUnique({
    where: {
      id: parseInt(orderId),
    },
  });

  if (!placeOrder) {
    return res.status(400).json({ message: "The placed order does not exist" });
  }

  console.log(
    productId.map((product) => ({
      productId: product.id,
      orderId: parseInt(orderId),
    }))
  );

  try {
    await prisma.order_Items.createMany({
      data: productId.map((product) => ({
        productId: product.id,
        orderId: parseInt(orderId),
      })),
    });
  } catch (error) {
    console.log(error);
  }
});

export default { placeOrder, orderItems };
