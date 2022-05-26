// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function getTags(req, res) {
  const session = await getSession({ req });
  if (session) {
    const tags = await prisma.tag.findMany({});
    return res.json(tags);
  } else {
    res.status(401)
  }
  res.end()
};
