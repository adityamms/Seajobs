import Employer from "@/model/employer";
import { connectToDB } from "@/utils/conectDb";
exports.handler = async (event, context) => {
  try {
    const connect = await connectToDB();

    if (event.httpMethod === "POST") {
      const { user_email, user_password } = req.body;

      // Use findOne instead of find to retrieve a single document
      const cari = await Employer.findOne({
        email: user_email,
        password: user_password,
      });

      if (!cari) {
        return {
          statusCode: 404, // or any other HTTP status code
          body: JSON.stringify({ message: "tidak ada" }),
        };
      }

      // Check both email and password for a match
      if (user_email !== cari.email || user_password !== cari.password) {
        return {
          statusCode: 400, // or any other HTTP status code
          body: JSON.stringify({ message: "Email / password salah" }),
        };
      } else {
        return {
          statusCode: 200, // or any other HTTP status code
          body: JSON.stringify({ data: cari }),
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 500, // or any other HTTP status code
      body: JSON.stringify({ msg: "Internal server error" }),
    };
  }
};
