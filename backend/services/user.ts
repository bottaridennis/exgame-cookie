import { Role, User} from "../../api-types";
import DB from "./db";

const userSchema = new DB.Schema<User>({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  created_at: String,
  updated_at: String,
  role: String,
});

export const UserModel = DB.model("user", userSchema);

export const index = async () => {
  return UserModel.find({});
};

export const getUsersByRole = async (role: Role) => {
  return UserModel.find({ role });
};

export const view = async (id: string) => {
  return UserModel.findById(id);
};

export const add = async (user: User) => {
  const UserData = new UserModel(user);
  return UserData.save();
};

export const edit = async (id, user: User) => {
  const UserDocument = await UserModel.findById(id);

  if (!UserDocument) {
    throw new Error(`Can't find user by id: ${user._id}`);
  }

  UserDocument.set(user);
  return UserDocument.save();
};

export const remove = async (id: string) => {
  return UserModel.deleteOne({ _id: id });
};

// Find user by email and password
export const findByEmailAndPassword = async (email: string, password: string) => {
  return UserModel.findOne({ email, password });
};
