import mongoose from 'mongoose';

const GarageSchema = new mongoose.Schema({
    garageName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    garageNumber: {
        type: Number,
        default: 0,
        required: true
    },
    carsInLot: {
        type: Number,
        default: 0,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

GarageSchema.pre('save', function(next) {
    if (this.isNew) {
        this.constructor.countDocuments({}).then(res => {
            this.garageNumber = res + 1; // Increment count
            next();
        });
    } else {
        io.emit("updated", this._id, this.carsInLot);
        next();
    }
});

module.exports.Garage = mongoose.model('Garage', GarageSchema);