import { connectToDB } from "@/utils/conectDb";
import seaman from "@/model/seaman";
exports.handler = async (event, context) => {
  let sendDate = new Date().getTime();
  await connectToDB();
  let receiveDate = new Date().getTime();
  let responseTimeMs = receiveDate - sendDate;

  console.log(responseTimeMs);

  let coba = await seaman.find({});
  return {
    statusCode: 200, // or any other HTTP status code
    body: JSON.stringify({ message: "berhasil", coba }),
  };
};
