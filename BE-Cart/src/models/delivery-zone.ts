import moongoose, { Document, Schema } from 'mongoose';

interface IDeliveryZone extends Document {
  name: String,
  area: {
    type: "Polygon",
    coordinates: number[][][]
  },
  pincode: String
}

const deliveryZoneSchema = new Schema<IDeliveryZone>({
  name: { type: String, required: true },
  area: {
    type: { type: String, enum: ["Polygon"], required: true },
    coordinates: { type: [[[Number]]], required: true }
  },
  pincode: { type: String, required: true }
}, {
  timestamps: true
});

deliveryZoneSchema.index({ area: '2dsphere' });
deliveryZoneSchema.index({ pincode: 1 }, { unique: true });
const DeliveryZone = moongoose.model<IDeliveryZone>('DeliveryZone', deliveryZoneSchema);
export default DeliveryZone;
