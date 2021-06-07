import { model, Schema } from 'mongoose';
import moment from 'moment';

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastame: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, minLength: 6 },
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book"
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

UserSchema.virtual("timeCreated").get(function() {
  return `${moment(this.createdAt).format("MMM Do YYYY")}`;
});

export default model("User", UserSchema);