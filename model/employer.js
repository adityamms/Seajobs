import mongoose from "mongoose";
let Schema = mongoose.Schema;

const company_postSchema = new Schema({
  type: { type: String, required: true },
  job_post_title: { type: String, required: true },
  number_of_vacancy: { type: Number, required: true },
  commitment_type: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  remote_job: { type: Boolean, required: true },
  visa: { type: Boolean, required: true },
  forreignn_applicant: { type: Boolean, required: true },
  visa_sponsorship: { type: Boolean, required: true },
  job_description: { type: String, required: true },
});

const employerSchema = new Schema(
  {
    account_type: { type: String },
    company_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    company_website: { type: String, required: true },
    company_country: {
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
    company_city: { type: String, required: true },
    company_address: { type: String, required: true },
    company_logo: { type: String },
    lowongan: [company_postSchema],
    image: String,
  },
  { timestamps: true }
);

let employer;

if (mongoose.models.employer) {
  employer = mongoose.model("employer");
} else {
  employer = mongoose.model("employer", employerSchema);
}
export default employer;
