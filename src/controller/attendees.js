import attendeesModel from "../models/attendees.js";

export const addAttendees = async (req, res) => {
  try {
    const csvName = "csv";
    const data = req.body;
    const date = new Date();
    const currentData = date.getTime()

    data.forEach((e) => {
      e.csvName = csvName;
      e.csvId = `${csvName}${currentData}`;
    });

    const result = await attendeesModel.insertMany(data);

    res
      .status(201)
      .json({ status: true, message: "Attendees Added successfully", result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllAttendees = async (req, res) => {
  try {
    const result = await attendeesModel.find();

    res
      .status(200)
      .json({
        status: true,
        message: "Attendees data found successfully",
        result,
      });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getCsvData = async (req, res) => {
  try {
    const pipeline = [
      // {
      //   $match: { userId: userId },
      // },
      {
        $group: {
          _id: "$csvId",
          attendees: { $push: "$$ROOT" },
        },
      },
    ];

    const csvDataRes = await attendeesModel.aggregate(pipeline);

    res.status(200).json({ status: true, data: csvDataRes });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};
