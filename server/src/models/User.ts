import mongoose, {Schema, model, Types} from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
};

export const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    data: [{type: Types.ObjectId, ref: 'Passwords'}]
});

const User = model<IUser>('User', UserSchema);

export default User
