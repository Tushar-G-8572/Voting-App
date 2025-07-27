const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
  text:String,
  votes:{
    type:Number,
    default:0
  }
});

const pollSchema = new mongoose.Schema({
  question:{
    type:String,
    require:true
  },
  options:[optionSchema],
  correctOption:{
    type:Number,
    require:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin'
  },
  closingDateTime:{
    type:Date,
    required:true
  },
  voters:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  isClosed:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

module.exports = mongoose.model("poll",pollSchema);