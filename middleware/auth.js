const { jwt, verify } = require("jsonwebtoken");
require("dotenv").config()

exports.jwtAuth = {

  verifySuperAdmin: (req, res, next) => {
    
    let token = req.headers["authorization"].split(" ")[1];
    
    
    if (!token) return res.status(403).send({ message: "Unauthorised Access" });

    verify(token, process.env.secret, (err, decode) => {
      if (err) return res.status(400).send({ message: "forbidden access" });
      console.log(decode.userType);
      if (decode.userType !== "superadmin")
        return res.status(401).send({ message: "forbidden access 2" });
        
      next();
    });
  },
  verifyAdmin: (req, res, next) => {
    
    let token = req.headers["authorization"].split(" ")[1];
    
    
    if (!token) return res.status(403).send({ message: "Unauthorised Access" });

    verify(token, process.env.secret, (err, decode) => {
      if (err) return res.status(400).send({ message: "forbidden access" });
      console.log(decode.userType);
      if (decode.userType !== "admin")
        return res.status(401).send({ message: "forbidden access 2" });
        
      next();
    });
  },
  verifyLogger: (req, res, next) => {
    
    let token = req.headers["authorization"].split(" ")[1];
    
    
    if (!token) return res.status(403).send({ message: "Unauthorised Access" });

    verify(token, process.env.secret, (err, decode) => {
      if (err) return res.status(400).send({ message: "forbidden access" });
        
      next();
    });
  }
}