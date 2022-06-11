import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

const getTasks = async (res) => {
  const categories = await prisma.category.findMany({});
  return res.status(200).json(categories);
};

const insertTag = async (req, res) => {
  const category = await prisma.category.create({ data: { name: req.body.name } });
  return res.status(200).json(category);
};

const deleteTag = async (req, res) => {
  const category = await prisma.category.delete({ where: { id: req.body.id } });
  return res.status(200).json(category);
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    switch (req.method) {
      case "GET":
        return getTasks(res);
      case "POST":
        return insertTag(req, res);
      case "DELETE":
        return deleteTag(req, res);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
