import attendeesModel from "../models/attendees.js";

export const addAttendees = async (req, res) => {
  try {

    const data = req.body;
    const csvName = req?.body[0].csvName
    const date = new Date();
 const randomString= date.getTime()

    data.forEach((e) => {
      e.csvId = `${csvName}${randomString}`;
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


export const deleteCsvData = async (req, res) => {
  try {
    const {csvId} = req.params
    const deleteResult = await attendeesModel.deleteMany({csvId: csvId})
    res.status(200).send(deleteResult)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)

  }
}