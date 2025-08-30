// File: /pages/api/houses/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import House from "@/lib/model/house";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const { category } = req.query;

      let query: any = {};
      if (category) {
        query["details.category"] = category; // filter by category inside details
      }

      const houses = await House.find(query);

      return res.status(200).json(houses);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error("Error fetching houses:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
