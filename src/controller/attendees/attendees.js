import attendeesModel from '../../models/attendees.js'
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
    let pipeline = {}
    if(req?.body?.csvId) pipeline = {csvId: req?.body?.csvId}

    const page = req?.params?.page || 1;
    const limit = 25;
    const skip = (page - 1) * limit;
    let totalPages = 0
        
   
    const totalAttendees = await attendeesModel.countDocuments(pipeline);
    totalPages = Math.ceil(totalAttendees / limit)
    
    const result = await attendeesModel.find(pipeline).skip(skip).limit(limit);
    
    res.status(200).json({
      status: true,
      message: "Attendees data found successfully",
      page,
      totalPages,
      result,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

export const getCsvData = async (req, res) => {
  try {
    const page = req?.params?.page || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const countPipeline = [
      {
        $group: {
          _id: "$csvId",
        },
      },
      {
        $count: "totalUniqueCsvIds"
      }
    ];

    const countResult = await attendeesModel.aggregate(countPipeline);
    const totalUniqueCsvIds = countResult.length > 0 ? countResult[0].totalUniqueCsvIds : 0;
    const totalPages = Math.ceil(totalUniqueCsvIds / limit);


    const pipeline = [
      {
        $sort: { createdAt: -1 } // Sort by createdAt in descending order first
      },
      {
        $group: {
          _id: "$csvId",
          csvName: { $first: "$csvName" },
          date: { $first: "$date" },
          createdAt: { $first: "$createdAt" }, // Include the createdAt field to maintain order
          originalId: { $first: "$_id" },
          count: {$sum: 1},
          // Include other fields as necessary
        },
      },
      {$sort: {createdAt: -1}},
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },

    ];

    const result = await attendeesModel.aggregate(pipeline);

    res.status(200).json({ status: true, page, totalPages, data: result });
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
