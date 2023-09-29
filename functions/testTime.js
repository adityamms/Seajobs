import { connectToDB } from "@/utils/conectDb";
import seaman from "@/model/seaman";
exports.handler = async (event, context) => {
  await connectToDB();
  let coba = seaman.find({});
  return {
    statusCode: 200, // or any other HTTP status code
    body: JSON.stringify({ message: "berhasil", coba }),
  };
};
