const TravelStory = require("../models/travelStory.model");

// [POST] /travels/createPost
module.exports.createPost = async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;

  const { userId } = req.user;

  if(!title || !story || !visitedLocation || !imageUrl || !visitedDate){
    return res.status(400).json({
      error: true,
      message: "All fields are required"
    })
  }

  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const travelStory = new TravelStory({
      title, story, visitedLocation, userId, imageUrl,
      visitedDate: parsedVisitedDate
    });

    await travelStory.save();
    
    return res.status(201).json({
      story: travelStory,
      message: "Added Successfully"
    })
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message
    })
  }
}

// [POST] /travels/index
module.exports.index = async (req, res) => {
  const { userId } = req.user;

  try {
    const stories = await TravelStory.find({
      userId: userId
    }).sort({
      isFavorite: -1
    })
    return res.status(200).json({
      stories: stories
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}