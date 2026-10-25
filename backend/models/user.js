
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        accountType: {
            type: String,
            enum: ["student", "teacher"],
            required: true
        },

        // Student-specific fields
        course: {
            type: String,
            trim: true,
            required: function () {
                return this.accountType === "student";
            }
        },

        college: {
            type: String,
            trim: true,
            required: function () {
                return this.accountType === "student";
            }
        },

        session: {
            type: String,
            trim: true,
            required: function () {
                return this.accountType === "student";
            }
        },

        contactNo: {
            type: String,
            trim: true,
            required: function () {
                return this.accountType === "student";
            }
        },

        // Teacher-specific fields
        domain: {
            type: String,
            trim: true,
            required: function () {
                return this.accountType === "teacher";
            }
        },

        institution: {
            type: String,
            trim: true,
            required: function () {
                return this.accountType === "teacher";
            }
        }
    },
    { timestamps: true }
);


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
