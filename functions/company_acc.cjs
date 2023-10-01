import employer from "@/model/employer";
import { connectToDB } from "@/utils/conectDb";

exports.handler = async (event, context) => {
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
};
