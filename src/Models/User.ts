export default function user(mongoose: any): object {
  const schema = mongoose.Schema;

  const userSchema = new schema({
    name:     { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true, select: false },
    username: { type: String, required: true },
    isActive: { type: Number,
      enums: [
        0,    // 'Active',
        1,    // 'Inactive',
      ] },
    friends: [{ type: schema.Types.ObjectId, ref: 'User' }],
  },                            { timestamps: true });

  return mongoose.model('User', userSchema);
}
