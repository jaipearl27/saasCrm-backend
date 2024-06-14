import attendeesModel from "../models/attendees.js"

export const addAttendees = async (req, res) => {
    try {
        const data = req.body
        const result = await attendeesModel.insertMany(data)
        res.status(200).json({result: result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: result})
    }
}