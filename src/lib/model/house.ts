import { Schema, model, models } from "mongoose";

const houseSchema = new Schema(
  {
    details: {
      title: {
        type: String,
        trim: true,
      },
      type: {
        type: String, // e.g., apartment, duplex, bungalow
        lowercase: true,
      },
      category: {
        type: String, // e.g., rent, sale, lease
        lowercase: true,
      },
      state: { type: String },
      lga: { type: String },
      address: { type: String },
      description: {
        type: String,
        trim: true,
        max: 500,
      },
      price: {
        type: Number,
        required: true,
      },
      bedrooms: { type: Number, default: 1 },
      bathrooms: { type: Number, default: 1 },
      size: { type: String }, // e.g., "120sqm"
      availableFrom: { type: Date },
    },

    images: [
      {
        url: String,
        filename: String,
      },
    ],

    approved: { type: Boolean, default: false }, // only admin can change this
    featured: { type: Boolean, default: false }, // for highlighting top houses

    agentId: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to agent posting
      required: true,
    },

    inquiries: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User", // client asking about house
          required: true,
        },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        date: { type: Date, default: new Date() },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const House = models.House || model("House", houseSchema);
export default House;
