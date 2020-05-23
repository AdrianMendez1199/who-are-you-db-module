export default function user(mongoose: any): any {
  const schema = mongoose.Schema;

  const userSchema = new schema({
    name: String,
    lastname: String,
    password: String,
    username: String,
  });

  return mongoose.model('User', userSchema);
}
