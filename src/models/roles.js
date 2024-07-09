import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, 'Role name is required'],
            trim: true
        },
        roleIndex: {
            type: Number,
            required: [true, 'role index is required']
        }
    }
)

const rolesModel = mongoose.model('role', roleSchema)

export default rolesModel