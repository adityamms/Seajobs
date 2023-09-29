exports.handler = async (event, context) => {
  return {
    statusCode: 200, // or any other HTTP status code
    body: JSON.stringify({ message: "berhasil" }),
  };
};
