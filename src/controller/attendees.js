import attendeesModel from "../models/attendees.js"

export const addAttendees = async (req, res) => {
    try {
        const data = req.body
        const result = await attendeesModel.insertMany(data)
        res.status(201).json({status:true, message: "Attendees Added successfully" ,result})
    } catch (error) {
        res.status(500).json({status:false ,message:error.message})
    }
}

export const getAllAttendees = async (req, res) => {
    try {
        const result = await attendeesModel.find()

        res.status(200).json({status:true, message: "Attendees data found successfully" ,result})
    } catch (error) {
        res.status(500).json({status:false ,message:error.message})
    }
}