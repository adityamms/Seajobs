import Seaman from "@/model/seaman"; // Make sure to use the correct model name
import { connectToDB } from "@/utils/conectDb";
import { Binary } from "mongodb";

export default async function seamen(req, res) {
  try {
    const connect = await connectToDB();

    if (req.method === "POST") {
      console.log(req.body);
      const { user_email, user_password } = req.body;

      // Use findOne instead of find to retrieve a single document
      const cari = await Seaman.findOne({
        email: user_email, // Correct the field names to match your model
        password: user_password, // Correct the field names to match your model
      });

      if (!cari) {
        return res.status(404).json({ msg: "Tidak ada" });
      }

      // Check both email and password for a match
      if (user_email !== cari.email || user_password !== cari.password) {
        return res.status(400).json({ msg: "Email / password salah" });
      } else {
        res.status(200).json({ data: cari });
      }
    }

    if (req.method === "PATCH") {
      let { email, image, password, upload_CV } = req.body;
      let data = await Seaman.findOne({ email: email, password: password });
      if (!res) {
        return res.json({ hi: "account tidak terbaca" });
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
    console.error("Error:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}
