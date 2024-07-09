import attendeesModel from "../models/attendees.js";

export const addAttendees = async (req, res) => {
  try {
    const data = req.body;
    const csvName = req?.body[0].csvName;
    const date = new Date();
    const randomString = date.getTime();

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

export const getAttendees = async (req, res) => {
  try {
    
    const page = req?.params?.page || 1;
    const limit = 25;
    const skip = (page - 1) * limit;
    
    const result = await attendeesModel.find().skip(skip).limit(limit);

    res.status(200).json({
      status: true,
      message: "Attendees data found successfully",
      page,
      result,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getCsvData = async (req, res) => {
  try {
    const page = req?.params?.page || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const pipeline = [
      {
        $group: {
          _id: "$csvId",
          csvName: { $first: "$csvName" },
          date: { $first: "$date" },
          // Include other fields as necessary
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];

    const result = await attendeesModel.aggregate(pipeline);

    res.status(200).json({ status: true, page, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error });
  }
};

export const deleteCsvData = async (req, res) => {
  try {
    const { csvId } = req.params;
    const deleteResult = await attendeesModel.deleteMany({ csvId: csvId });
    res.status(200).send(deleteResult);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
