import pkg from "mongoose";
const { Schema, model } = pkg;

const shippmentSchema = new Schema(
  {
    countryFromId: {
      type: { type: Schema.Types.ObjectId, ref: "Country" },
      required: true,
    },
    countryToId: {
      type: { type: Schema.Types.ObjectId, ref: "Country" },
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    shipmentName: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    totalWeight: {
      type: Number,
    },
    status: {
        type: String,
        enum : ['1' |'Ongoing','2'|'Delivered','3'|'Cancelled','4'|'New','5'|'Completed'],
        required:true
    },
    representedImage: {
        type: String,
        required:false
    },
    createdBy:  {type: Schema.Types.ObjectId, ref: 'User',required:true} ,
  },
  {
    timestamps: true,
  }
);

const shippmentModel = model("Shippment", shippmentSchema);
export default shippmentModel;
