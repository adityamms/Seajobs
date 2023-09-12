import mongoose from "mongoose";
let Schema = mongoose.Schema;

const seamanSchema = new Schema({
  type: { type: String },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  job_position: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  country: {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  city: { type: String, required: true },
  addres: { type: String, required: true },
  image: String,
  upload_CV: String,
});

let seaman;

if (mongoose.models.seaman) {
  seaman = mongoose.model("seaman");
} else {
  seaman = mongoose.model("seaman", seamanSchema);
}
export default seaman;
