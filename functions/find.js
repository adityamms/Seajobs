import Employer from "@/model/employer";
import { connectToDB } from "@/utils/conectDb";

exexports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
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
        return {
          statusCode: 404, // or any other HTTP status code
          body: JSON.stringify({ message: "no matching found" }),
        };
      }
      return {
        statusCode: 200, // or any other HTTP status code
        body: JSON.stringify(cari),
      };
    } catch (error) {
      return {
        statusCode: 500, // or any other HTTP status code
        body: JSON.stringify({ err: "error internal server" }),
      };
    }
  }
};
