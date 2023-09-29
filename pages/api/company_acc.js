import employer from "@/model/employer.js";
import { connectToDB } from "@/utils/conectDb.js";

export default async function company_acc(req, res) {
  if (req.method === "PATCH") {
    try {
      let connection = await connectToDB();
      let { email, account_type } = req.body; // Ensure 'data' is defined in your request body
      let data = req.body;
      if (!email && account_type != "Company") {
        res.status(405).json({ message: "method not allowed" });
      }

      // Use the correct usage of findOneAndUpdate
      let cari = await employer.findOneAndUpdate(
        { email: email },
        {
          $push: { lowongan: data },
        },
        { upsert: true, new: true } // 'new: true' returns the updated document
      );

      res.json(cari);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ err: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
