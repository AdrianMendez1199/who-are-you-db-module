export default function user(mongoose: any): object {
  const schema = mongoose.Schema;

  const userSchema = new schema({
    name:     { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
  });

  return mongoose.model('User', userSchema);
}
