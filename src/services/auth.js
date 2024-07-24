import User from "../db/user.js";
import { hashValue } from "../utils/hash.js";

export const signup = async (data) => {
    const { password } = data;
    const hashPassword = await hashValue(password);
    return User.create({ ...data, password: hashPassword });
};
export const findUser = filter => User.findOne(filter);
