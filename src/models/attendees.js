import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        trim: true,
    },
    timeInSession: {
        type: Number,
        required: [true, "time in session required"],
        default: 0
    },
    leadType: {
      type: String,
      default: null
    },
    date: {
      type: String,
      required: [true, 'Webinar Date is required']
    },
    csvId: {
        type: String,
        required: [true, "csv file id/name is required"]
    }
  },
  { timestamps: true }
);

const attendeesModel = mongoose.model("attendee", attendeeSchema);

export default attendeesModel
