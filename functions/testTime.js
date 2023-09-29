import { connectToDB } from "@/utils/conectDb";
exports.handler = async (event, context) => {
  await connectToDB();
  return {
    statusCode: 200, // or any other HTTP status code
    body: JSON.stringify({ message: "berhasil" }),
  };
};
