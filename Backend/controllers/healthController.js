const Health = require("../models/health");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newHealth = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  try {
    const health = await Health.create(req.body);
    res.status(201).json({
      success: true,
      health,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      console.log(errors);

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
});

// Getting Hetlths
exports.getHealths = async (req, res, next) => {
  const health = await Health.find();

  res.status(200).json({
    success: true,
    health,
  });
};
