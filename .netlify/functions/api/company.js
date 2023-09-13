import Employer from "@/model/employer"; // Corrected the import statement
import { connectToDB } from "@/utils/conectDb";

export default async function company(req, res) {
  try {
    const connect = await connectToDB();

    if (req.method === "POST") {
      const { user_email, user_password } = req.body;

      // Use findOne instead of find to retrieve a single document
      const cari = await Employer.findOne({
        email: user_email,
        password: user_password,
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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}
