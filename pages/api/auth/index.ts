import { NextApiRequest, NextApiResponse } from "next";
import { GoogleUserInfo } from "../../../types";
import { client } from "../../../utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const user: GoogleUserInfo = req.body;
      const sanityUser = await client.createIfNotExists(user);
      res.status(200).json(sanityUser);
      break;
  }
};

export default handler;
