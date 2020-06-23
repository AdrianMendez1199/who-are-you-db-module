import mongoose from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: false },
  bio: { type: String, required: false },
  age: { type: Number, required: false },
  isActive: {
    type: Number,
    enums: [
      0,    // 'Active',
      1,    // 'Inactive',
    ],
  },
  friends: [{ type: schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: schema.Types.ObjectId, ref: 'Post' }],
},
                              { timestamps: true });

userSchema.methods.toJSON = function (): object {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);

