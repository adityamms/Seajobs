import mongoose from "mongoose";
let Schema = mongoose.Schema;

export const company_postSchema = new Schema({
  job_post_title: { type: String, required: true },
  number_of_vacancy: { type: Number, required: true },
  commitment_type: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  remote_job: { type: Boolean },
  visa: { type: Boolean },
  forreignn_applicant: { type: Boolean },
  visa_sponsorship: { type: Boolean },
  job_description: { type: String, required: true },
});
