import { connectToDB } from "@/utils/conectDb";
import employer from "@/model/employer";
import seaman from "@/model/seaman";

export default async function hello(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    try {
      const limit = 15; // You can specify the limit as a query parameter

      // Set a default limit or use the value from the query parameter
      const itemsLimit = parseInt(limit) || 10;

      const query = {};

      const cari = await employer
        .find(query, { lowongan: 1 })
        .limit(itemsLimit);

      if (!cari || cari.length === 0) {
        // Handle case where no matching employers are found
        res.status(404).json({ message: "No matching employers found." });
        return;
      }

      res.status(200).json(cari);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ err: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    if (req.body.account_type === "Company") {
      try {
        let baru = await new employer(req.body);
        console.log(baru);
        await baru.save();
        res.status(200).end();
      } catch (error) {
        console.log(error);
        res.status(400).json({ meg: "gagal" });
      }
    } else
      try {
        await connectToDB();
        let baru = await new seaman(req.body);
        console.log(baru);
        await baru.save();
        res.status(200).end();
      } catch (error) {
        console.log(error);
        res.status(400).json({ meg: "gagal" });
      }
  }
}
