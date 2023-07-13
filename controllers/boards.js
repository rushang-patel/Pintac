const board = require('../pin/board');

module.exports = {
    create
};

async function create(req, res) {
    const board = await board.findById(req.params.id);
  
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    // We can push (or unshift) subdocs into Mongoose arrays
    pin.board.push(req.body);
    try {
      // Save any changes made to the board doc
      await board.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/Boards/${pin._id}`);
  }