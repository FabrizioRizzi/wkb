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
        category: true,
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
        category: true,
      },
    });
  } else {
    documents = await prisma.document.findMany({
      take: Number(req.query.size),
      include: {
        tags: true,
        category: true,
      },
    });
  }
  return res.status(200).json(documents);
};

const insertDocument = async (req, res) => {
  const session = await getSession({ req });
  const document = await prisma.document.create({
    data: {
      title: req.body.title,
      url: req.body.url,
      user: { connect: { id: session.user.id } },
      category: { connect: { id: req.body.category } },
      tags: { connect: req.body.tags },
    },
  });
  return res.status(200).json(`Document ${document.id} created`);
};

/*
const deleteTag = async (req, res) => {
  const tag = await prisma.tag.delete({ where: { id: req.body.id } });
  return res.status(200).json(tag);
}; */

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session?.user) {
    switch (req.method) {
      case "GET":
        return getDocs(res, req);
      case "POST":
        return insertDocument(req, res);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
