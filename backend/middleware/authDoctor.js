import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const dToken = req.headers.authorization?.split(" ")[1];
    if (!dToken) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRETS);
    req.docId = decoded.id; 
    console.log("Decoded Token Payload:", decoded); 
    next();
  } catch (error) {
    console.error("Auth Error:", error.message); // Debugging
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authDoctor;
