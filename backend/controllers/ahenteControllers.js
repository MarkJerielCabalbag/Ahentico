import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

//@DESC     register ahente
//@ROUTE    POST /api/agentify/ahente/register/:userId
//@ACCESS   private
const registerAhente = asyncHandler(async (req, res, next) => {
  const { name, company, contact, productCoverage } = req.body;
  const { id } = req.params;

  if (!name || !company || !contact || !productCoverage) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }

  //find duplicate
  const ahentes = await prisma.ahente.findMany();

  for (let ahente of ahentes) {
    if (ahente.name === name) {
      return res.status(400).json({
        message: `${ahente.name} is already exist to your distributor list`,
      });
    }
  }

  const newAhente = await prisma.ahente.create({
    data: {
      name: name,
      company: company,
      contact: parseInt(contact),
      productCoverage: productCoverage,
      addedBy: {
        connect: {
          id: parseInt(id),
        },
      },
    },
  });
  res
    .status(200)
    .json({ message: `${newAhente.name} is added as your new distributor` });
});

//@DESC     edit ahente
//@ROUTE    POST /api/agentify/ahente/edit/:ahenteId
//@ACCESS   private
const editAhente = asyncHandler(async (req, res, next) => {
  const { ahenteId } = req.params;
  const { name, company, contact, productCoverage } = req.body;
  if (!ahenteId) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  const ahente = await prisma.ahente.update({
    where: {
      id: parseInt(ahenteId),
    },
    data: {
      name: name,
      company: req.body.company || company,
      contact: parseInt(req.body.contact) || contact,
      productCoverage: req.body.productCoverage || productCoverage,
    },
  });

  return res
    .status(200)
    .json({ message: `${ahente.name} is successfully edited` });
});

//@DESC     remove ahente
//@ROUTE    POST /api/agentify/ahente/del/:ahenteId
//@ACCESS   private

export default { registerAhente, editAhente };
