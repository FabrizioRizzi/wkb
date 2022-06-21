import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

const getDocs = async (res, req) => {
  let documents;
  if (req.query.lastCursor) {
    documents = await prisma.document.findMany({
      take: Number(req.query.size),
      skip: 1,
      cursor: {
        id: Number(req?.query?.lastCursor),
      },
      include: {
        tags: true,
        category: true
      },
    });
  } else if (req.query.firstCursor) {
    documents = await prisma.document.findMany({
      take: -Number(req.query.size),
      skip: 1,
      cursor: {
        id: Number(req?.query?.firstCursor),
      },
      include: {
        tags: true,
        category: true
      },
    });
  } else {
    documents = await prisma.document.findMany({
      take: Number(req.query.size),
      include: {
        tags: true,
        category: true
      },
    });
  }
  return res.status(200).json(documents);
};

/* 
const insertTag = async (req, res) => {
  const tag = await prisma.tag.create({ data: { name: req.body.name } });
  return res.status(200).json(tag);
};

const deleteTag = async (req, res) => {
  const tag = await prisma.tag.delete({ where: { id: req.body.id } });
  return res.status(200).json(tag);
}; */

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    switch (req.method) {
      case "GET":
        return getDocs(res, req);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
