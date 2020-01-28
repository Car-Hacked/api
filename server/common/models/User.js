import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

UserSchema.statics.authenticate = async function (Username, password) {
    let user = await this.findOne({ username: Username });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match === true) {
            user = await user.populate('currentDay').execPopulate().catch(error => error);
            if (user instanceof Error) return user;
            return user;
        }
        let error = new Error('Invalid credentials');
        error.code = 'INVALID_CREDS';
        return error;
    }
};

UserSchema.pre('save', async function (next) {
    if (this.password.length !== 60) {
        let hash = await bcrypt.hash(this.password, 10).catch(err => err);
        if (hash instanceof Error) {
            return next(hash);
        }
        this.password = hash;
        return next();
    }
    return next();
});

module.exports.User = mongoose.model('User', UserSchema);
