export default function user(mongoose: any): object {
  const schema = mongoose.Schema;

  const comentarySchema = new schema({
    author: { type: schema.Types.ObjectId, ref: 'User' },
    post: {  type: schema.Types.ObjectId, ref: 'Post' },
    commentary: { type: String, required: true, trim: true  },
  },
                                     { timestamps: true });

  return mongoose.model('Commentary', comentarySchema);
}

