import mongoose from 'mongoose';

const GarageSchema = new mongoose.Schema({
    garageName: {
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
            this.garageNumber = res; // Increment count
            next();
        });
    } else {
        next();
    }
});

module.exports.Garage = mongoose.model('Garage', GarageSchema);