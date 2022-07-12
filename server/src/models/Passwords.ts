import mongoose, {Schema, model, Types} from 'mongoose';
export const ObjectId = Types.ObjectId;

export interface IPasswords extends mongoose.Document {
    name: string;
    password: string;
    user: string;
}

export const PasswordsSchema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    password: {type: String, required: true},
})

const Passwords = model<IPasswords>('Password', PasswordsSchema);

export default Passwords