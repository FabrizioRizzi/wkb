import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

const getTags = async (res) => {
  const tags = await prisma.tag.findMany({});
  return res.status(200).json(tags);
};

const insertTag = async (req, res) => {
  const tag = await prisma.tag.create({ data: { name: req.body.name } });
  return res.status(200).json(tag);
};

const deleteTag = async (req, res) => {
  const tag = await prisma.tag.delete({ where: { id: req.body.id } });
  return res.status(200).json(tag);
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    switch (req.method) {
      case "GET":
        return getTags(res);
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
