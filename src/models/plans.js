import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: [true, "Plan name is required"],
  },
  price: {
    type: Number,
    required: [true, "Plan Price is required"],
  },
  permissions: {
    admin: {
      type: [String],
      required: [true, "Admin permissions are required"],
    },
    employee: {
      type: [
        {
          role: {
            type: mongoose.Types.ObjectId,
            ref: "roles",
          },
          permission: {
            type: [String],
            required: [true, "permission for user required"],
          },
        },
      ],
      required: [true, "Admin permissions are required"],
    },
  },
  planExpiry: {
    type: String,
    required: [true, 'plan validity is required']
  }
});


export const planModel = mongoose.model('plan', planSchema, 'plan')