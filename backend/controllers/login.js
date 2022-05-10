const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req,res) => {
    const password = req.body.password
    const email = req.body.email.toLowerCase();

usersModel.findOne({email})
.then(async(result)=>{
    if (!result) {//(!result) means not found email
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }
      try {//compare passwords
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
        const payload = {
           
          userId: result._id,
          user: result.firstName,
        };
//  console.log("result here is----"+result);
        const options = {
          expiresIn: "120m",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
.catch((err)=>{ res.status(500).json({
    success: false,
    message: `Server Error`,
    err: err.message,
  });})
}


module.exports = {
    login,
  };
  