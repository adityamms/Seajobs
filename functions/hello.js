import employer from "@/model/employer";
import seaman from "@/model/seaman.js";
import { connectToDB } from "@/utils/conectDb";

exports.handler = async (event, context) => {
  await connectToDB();

  if (event.httpMethod === "GET") {
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
        return {
          statusCode: 404, // or any other HTTP status code
          body: JSON.stringify({ message: "no matching" }),
        };
      }

      return {
        statusCode: 200, // or any other HTTP status code
        body: JSON.stringify(cari),
      };
    } catch (error) {
      return {
        statusCode: 500, // or any other HTTP status code
        body: JSON.stringify({ err: error }),
      };
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
        console.log(error.msg);
        res.status(400).json({ meg: "gagal" });
      }
  }
};
