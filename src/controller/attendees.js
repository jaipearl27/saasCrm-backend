import attendeesModel from "../models/attendees"

export const addAttendees = (req, res) => {
    try {
        const attendee = new attendeesModel(data)
        const result = attendee.save()
    } catch (error) {
        console.error(error)
    }
}