import Seaman from "@/model/seaman.js";
import { connectToDB } from "@/utils/conectDb";

exports.handler = async (event, context) => {
  try {
    const connect = await connectToDB();

    if (event.httpMethod === "POST") {
      console.log(req.body);
      const { user_email, user_password } = req.body;

      // Use findOne instead of find to retrieve a single document
      const cari = await Seaman.findOne({
        email: user_email, // Correct the field names to match your model
        password: user_password, // Correct the field names to match your model
      });

      if (!cari) {
        return {
          statusCode: 404, // or any other HTTP status code
          body: JSON.stringify({ message: "not found" }),
        };
      }

      // Check both email and password for a match
      if (user_email !== cari.email || user_password !== cari.password) {
        return {
          statusCode: 400, // or any other HTTP status code
          body: JSON.stringify({ msg: "email password salah" }),
        };
      } else {
        return {
          statusCode: 200, // or any other HTTP status code
          body: JSON.stringify({ data: cari }),
        };
      }
    }

    if (event.httpMethod === "PATCH") {
      let { email, image, password, upload_CV } = req.body;
      let data = await Seaman.findOne({ email: email, password: password });
      if (!res) {
        return {
          statusCode: 200, // or any other HTTP status code
          body: JSON.stringify({ message: "tidak ada" }),
        };
      } else {
        let convertImg = new Buffer.from(image, "base64");
        let convertCv = new Buffer.from(upload_CV, "base64");
        data.image = convertImg;
        data.upload_CV = convertCv;
        await data.save();

        console.log(image, upload_CV);

        res.json({ hi: "PATCH", data });
      }
    } else {
      res.json({ error: err });
    }
  } catch (error) {
    return {
      statusCode: 500, // or any other HTTP status code
      body: JSON.stringify({ message: "internal err" }),
    };
  }
};
