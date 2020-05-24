/**
 * return model message
 * @param mongoose
 */
export default function message(mongoose: any): object {
  const schema = mongoose.Schema;

  const messageSchema = new schema({
    message: { type: String, required: true },
    sendAt: { type: Date, default: Date.now },
    to: {
      type: schema.Types.ObjectId,
      ref: 'User',
    },
  });

  return mongoose.model('message', messageSchema);
}
