import { createClient } from "../../app/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

const endpoint = process.env.KRANE_HOST;

const apiClient = createClient(endpoint, "token");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const data = await apiClient.getActivity(1);
  return res.json(data);
};

export default handler;
