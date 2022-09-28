const Dateslotlist = require('../models/dateslotlist')
const Schedule = require('../models/schedule')
const qr = require('qrcode');
const cloudinary = require('cloudinary')

exports.schedule = async (req, res) => {

	const { id } = req.params

	const user = await Schedule.find({'user_id' : id});

	// console.log(user);
    const dates = await Dateslotlist.find();
	var date=new Date();
	var yesterdate=new Date(date.setDate(date.getDate()-1));
	const newSelectedDate = new Date(yesterdate).toLocaleDateString()

	const selectedDate = await Dateslotlist.find({'date' : newSelectedDate});

	const selectedSlotDate = await Dateslotlist.find({'avaliableSlot' : 0});

	if (selectedDate != "") {
		const updatedSlot = await Dateslotlist.findByIdAndUpdate(selectedDate[0]._id, {
			$set: { 'avaliableSlot': 0,'totalSlot': 0}
					}, 
				{
					new: true,
					runValidators: true,
					useFindAndModify: false
				})
    }
	var userSched = user.map(function(dates){return dates.date_schedule});
	var disableDate = selectedSlotDate.map(function(dates){return dates.date;});
// console.log(disableDate);
	return res.status(200).json({
		success: true,
		dates,
		disableDate,userSched
	  })

}

exports.history = async (req, res) => {

	const { id } = req.params

	const user = await Schedule.find({'user_id' : id});

	var date = user.map(function(dates){return dates.date_schedule;});

	var now = new Date();

	const filter = user.filter(user => new Date(user.date_schedule) < now);

	// console.log(filter)
	return res.status(200).json({
		success: true,
		filter
	  })
}

exports.activity = async (req, res) => {

	const { id } = req.params

	const user = await Schedule.find({'user_id' : id});

	var date = user.map(function(dates){return dates.date_schedule;});

	var now = new Date();

	const filter = user.filter(user => new Date(user.date_schedule) >= now);

	// console.log(filter)
	return res.status(200).json({
		success: true,
		filter
	  })
}

exports.viewActivity = async (req, res) => {

	const { id } = req.params

	const schedData = await Schedule.find({'_id' : id});
	var schedDataQr = schedData.map(function(schedDatas){return schedDatas.qr_code});
	// var date = schedDataQr.map(function(schedDataQrss){return schedDataQrss.qr_code;});

	// var now = new Date();

	// const filter = schedDataQr.filter();

	// console.log(filter)
	return res.status(200).json({
		success: true,
		schedData,schedDataQr
	  })
}

exports.addReview = async (req, res) => {

	const { id } = req.params
	const {rate, comment} = req.body;
// console.log(rate,comment);
	const schedulesqr = await Schedule.findByIdAndUpdate(id,{review: {
		rate: rate,
		comment: comment
	}}, 
	{
		new: true,
		runValidators:true,
		useFindandModify:false
	})

	// const schedData = await Schedule.find({'_id' : id});
	// var schedDataQr = schedData.map(function(schedDatas){return schedDatas.qr_code});
	// var date = schedDataQr.map(function(schedDataQrss){return schedDataQrss.qr_code;});

	// var now = new Date();

	// const filter = schedDataQr.filter();

	console.log(id)
	return res.status(200).json({
		success: true,
	  })
}

exports.cancelActivity = async (req, res) => {

	const { id } = req.params

	const schedData = await Schedule.findById(id);
	const date = schedData.date_schedule;
	var yesterdate=new Date(date.setDate(date.getDate()-1));
	const dateUpdate = yesterdate.toLocaleDateString();
	
	const selectedDate = await Dateslotlist.find({'date' : dateUpdate});

	const updateSlot = selectedDate[0].avaliableSlot + 1;

	const updatedSlot = await Dateslotlist.findByIdAndUpdate(selectedDate[0]._id, {
        $set: { 'avaliableSlot': updateSlot}
                }, 
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })


	// console.log(updateSlot);
	await schedData.remove();

	
	return res.status(200).json({
		success: true,
	  })
}

exports.add = async (req, res) => {
    
	const {date, user_id, category, status} = req.body;

	// console.log(date, user_id, category, status);

	const selectedDate = await Dateslotlist.find({'date' : date});
	const updateSlot = selectedDate[0].avaliableSlot - 1;

	const updatedSlot = await Dateslotlist.findByIdAndUpdate(selectedDate[0]._id, {
       'avaliableSlot': updateSlot
                }, 
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

	const tomorrow = new Date(date)

	var todate= new Date(tomorrow.setDate(tomorrow.getDate()+1));

	const schedule = await Schedule.create({
		user_id: user_id, 
		date_schedule: todate, 
		category: category,
		status: status
	})

	const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
	const latest_data_id = latest_data[0]._id;
	let id_stringdata = JSON.stringify(latest_data_id)

	const qrOption = { 
		margin : 2,
		width : 175
	  };
	
	  const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

	  const result = await cloudinary.v2.uploader.upload(bufferImage, {
		folder: 'qrcode',
	})

	const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
		public_id: result.public_id,
		url: result.secure_url
	}}}, 
	{
		new: true,
		validateBeforeSave: false
	})

	//   console.log(bufferImage);

	return res.status(200).json({
		success: true,
		message:"success"
	  })
}

