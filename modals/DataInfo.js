import mongoose from "mongoose";


const DataInfoSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true  
    },
    text: {
        type: String,
        required: true
    },
    imageUrl:String
}, {
    timestamps: true,
})
export default mongoose.model('DataInfo', DataInfoSchema)