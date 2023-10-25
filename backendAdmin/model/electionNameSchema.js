const mongoose = require("mongoose");

const electionNameSchema = new mongoose.Schema({
	electionid: {
		type: Number,
        unique: true
	},
	banglaelectionname : {
		type:String,
		required:true
	 },
	englishelectionname : {
		type:String,
		required:true
	 },
	templatetype : {
		type:String,
		required:false
	 },
	 statusfordisplay : {
		type: Number,
        default: 1
	 },
  createdAt: {
    type: Date,
    default: Date.now
  }
	 });
	 
electionNameSchema.index({ electionid: 1 }, { unique: true });
electionNameSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastRecord = await this.constructor.findOne({}, { electionid: 1 })
      .sort({ _id: -1 })
      .exec(); // Use the `lean()` method to get plain JavaScript objects instead of Mongoose documents

    console.log('lastRecord electionnameschema');
    //console.log(lastRecord);

    const nextValue = lastRecord ? parseInt(lastRecord.electionid) + 1 : 1;
    this.electionid = nextValue.toString(); // Convert the nextValue back to a string before assigning it to `electionid`
  }
  next();
});
const Electionname = new mongoose.model("Electionname", electionNameSchema);

module.exports = Electionname;


