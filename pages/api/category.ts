import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

const getCategories = async (res) => {
  const categories = await prisma.category.findMany({});
  return res.status(200).json(categories);
};

const insertCategory = async (req, res) => {
  const category = await prisma.category.create({
    data: { name: req.body.name },
  });
  return res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
  const category = await prisma.category.delete({ where: { id: req.body.id } });
  return res.status(200).json(category);
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session?.user) {
    switch (req.method) {
      case "GET":
        return getCategories(res);
      case "POST":
        return insertCategory(req, res);
      case "DELETE":
        return deleteCategory(req, res);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
