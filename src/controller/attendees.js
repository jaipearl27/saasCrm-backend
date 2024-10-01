import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import attendeesModel from "../models/attendees.js";
import usersModel from "../models/users.js";

const ROLES = JSON.parse(process.env.ROLES);

export const addAttendees = asyncHandler(async (req, res) => {
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
});

export const getAttendees = asyncHandler(async (req, res) => {
  let pipeline = {};

  if (req?.query) {
    pipeline = req?.query;
  }

  if (req?.body?.csvId) pipeline = { csvId: req?.body?.csvId };

  const page = req?.params?.page || 1;
  const limit = 25;
  const skip = (page - 1) * limit;
  let totalPages = 0;

  const totalAttendees = await attendeesModel.countDocuments(pipeline);
  totalPages = Math.ceil(totalAttendees / limit);

  const result = await attendeesModel.find(pipeline).skip(skip).limit(limit);

  res.status(200).json({
    status: true,
    message: "Attendees data found successfully",
    page,
    totalPages,
    result,
  });
});

export const getCsvData = asyncHandler(async (req, res) => {
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
      $count: "totalUniqueCsvIds",
    },
  ];

  const countResult = await attendeesModel.aggregate(countPipeline);
  const totalUniqueCsvIds =
    countResult.length > 0 ? countResult[0].totalUniqueCsvIds : 0;
  const totalPages = Math.ceil(totalUniqueCsvIds / limit);

  const pipeline = [
    {
      $sort: { createdAt: -1 }, // Sort by createdAt in descending order first
    },
    {
      $group: {
        _id: "$csvId",
        csvName: { $first: "$csvName" },
        date: { $first: "$date" },
        createdAt: { $first: "$createdAt" }, // Include the createdAt field to maintain order
        originalId: { $first: "$_id" },
        count: { $sum: 1 },
        // Include other fields as necessary
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await attendeesModel.aggregate(pipeline);

  res.status(200).json({ status: true, page, totalPages, data: result });
});

export const deleteCsvData = asyncHandler(async (req, res) => {
  const { csvId } = req.params;
  const deleteResult = await attendeesModel.deleteMany({ csvId: csvId });
  res.status(200).send(deleteResult);
});

export const assignAttendee = asyncHandler(async (req, res) => {
  const { email, userId, attendeeId } = req?.body;

  if (!email && !userId & !attendeeId) {
    res
      .status(500)
      .json({ status: false, message: "missing email/userId/attendeeId" });
  }

  //checking if attendee exists in DB
  const attendee = await attendeesModel.findOne({ _id: attendeeId });
  if (!attendee) {
    return res.status(404).json({ message: "Attendee not found" });
  }

  const isAssigned = await usersModel.findOne({
    "assignments.email": email,
    "assignments.recordType": attendee?.recordType,
  });

  if (isAssigned) {
    return res
      .status(400)
      .json({ message: "Attendee is already assigned to a user" });
  }

  //getting user to be assigned's data as per userId
  const user = await usersModel.findOne({
    _id: userId,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let roleAllowed = false;

  //conditions for assigning attendee as per user role, i.e reminder / sales employee
  switch (attendee?.recordType) {
    case "sales":
      roleAllowed = String(user?.role) === String(ROLES?.EMPLOYEE_SALES);
      break;
    case "reminder":
      roleAllowed = String(user?.role) === String(ROLES?.EMPLOYEE_REMINDER);
      break;
    default:
      roleAllowed = false;
      break;
  }

  //executing assingment if role is allowed
  if (roleAllowed) {
    const result = await usersModel.findByIdAndUpdate(
      userId,
      { $push: { assignments: { email, recordType: attendee?.recordType } } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Attendee assigned successfully", data: result });
  } else {
    res.status(500).json({
      message: "Role not allowed to get this attendee assigned.",
      role: user?.role,
      sales: ROLES?.EMPLOYEE_SALES,
      reminder: ROLES?.EMPLOYEE_REMINDER,
      attendeeRole: attendee?.recordType,
    });
  }
});
