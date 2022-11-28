import pkg from "mongoose";
const { Schema, model } = pkg;

const shippmentDetailSchema = new Schema(
  {
    shipmmentId: {
      type: { type: Schema.Types.ObjectId, ref: "Shippment" },
      required: true,
    },
    itemLink: {
      type: String,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    categoryId: {
      type: { type: Schema.Types.ObjectId, ref: "Category" },
      required: true,
    },
    itemImages: [{ type: String }],
    itemImagesUrls: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const shippmentDetailModel = model("ShippmentDetail", shippmentDetailSchema);
export default shippmentDetailModel;
