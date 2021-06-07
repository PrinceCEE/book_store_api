import { model, Schema } from 'mongoose';
import moment from 'moment';

const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  poster: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: String,
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

BookSchema.virtual("timeCreated").get(function() {
  return `${moment(this.createdAt).format("MMM Do YYYY")}`;
});

export default model("Book", BookSchema);