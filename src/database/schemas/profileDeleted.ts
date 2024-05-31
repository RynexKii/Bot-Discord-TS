import { Schema } from "mongoose";

export const profileDeletedSchema = new Schema(
    {
        userId: { type: String, required: true },
        bloods: { type: Number, default: 0 },
        aboutMe: { type: String },
        fame: { type: Number, default: 0 },
        activeMemberTimestamp: { type: Number },
    },
    {
        versionKey: false,
    }
);
