import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

let counter = mongoose.model('counter', CounterSchema);

const GarageSchema = new mongoose.Schema({
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
    let doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.garageNumber = counter.seq;
        next();
    });
});

module.exports.Garage = mongoose.model('Garage', GarageSchema);