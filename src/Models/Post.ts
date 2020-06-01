export default function user(mongoose: any): object {
  const schema = mongoose.Schema;

  const postSchema = new schema({
    author: { type: schema.Types.ObjectId, ref: 'User' },
    post: { type: String, require: true },
    commentaries: [
      { commentary: String },
      { date: Date, default: Date.now },
    ] },
                                { timestamps: true });

  return mongoose.model('Post', postSchema);
}

