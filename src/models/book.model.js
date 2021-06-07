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
  bookRating: {
    _id: false,
    users: [{
      _id: false,
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, max: 5, min: 0 },
    }],
    totalRating: { type: Number, default: 0 },
    cumulative: { type: Number, default: 0 },
  }
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