const jwt = require('jsonwebtoken');

async function authenticate (req) {
    const token = await req.headers.authorization

    try {
      var decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      if(new Date(decoded.exp) > new Date()){
        throw new Error("Token is expired");
      }
      const { userId, email } = decoded;
      return { userId, email };
    } catch (error) {
        throw new Error(error.message || error || "Token not found");
    }
}


module.exports = { authenticate };