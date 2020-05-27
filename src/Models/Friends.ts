/**
 * return model message
 * @param mongoose
 */
export default function message(mongoose: any): object {
  const schema = mongoose.Schema;

  const friendSchema = new schema({
    requester: { type: schema.Types.ObjectId, ref: 'Users' },
    recipient: { type: schema.Types.ObjectId, ref: 'Users' },
    status: {
      type: Number,
      enums: [
        0,    // 'add friend',
        1,    // 'requested',
        2,    // 'pending',
        3,    // 'friends'
      ],
    },
  },                              { timestamps: true });

  return mongoose.model('Friends', friendSchema);
}
