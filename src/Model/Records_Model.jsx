import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_KEY,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const RecordSchema = new mongoose.Schema({  // this is what it will be stored on the submission.
    username: {
      type: String,
      required: true,
    },
    date: { // date when it is submitted.
      type: String,
    },
    subject: {
      type: String,
      default: "", 
    },
    professor: {
        type: String,
        default: "", 
      },
    credit: {
        type:Number,
      },
      
    venue:{
        type:String,
    },
    time:{  // when is the class.
        type:String,
    },
    status:{
        type:String,
        default:"NULL",
    }
    
  });

const Record = mongoose.model('Records', RecordSchema);
module.exports = Record;