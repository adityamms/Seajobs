import Employer from "@/model/employer";
import { connectToDB } from "@/utils/conectDb";

export default async function find(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      await connectToDB();
      const { job_post_title, location, page } = req.body;
      const itemsPerPage = 15;
      const currentPage = parseInt(page) || 1;
      const skip = (currentPage - 1) * itemsPerPage;

      const query =
        job_post_title || location
          ? {
              $or: [
                { "lowongan.location": location },
                { "lowongan.job_post_title": job_post_title },
              ],
            }
          : {};

      const cari = await Employer.find(query).skip(skip).limit(itemsPerPage);

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
}
