const {getAuth} = require('firebase-admin/auth');

const validateFirebaseIdToken = async(req,res, next)=>{
    const authHeader = req.headers.authorization;
    
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Token missing or malformed" });
      }
    
      // Extracting token from request to authenticate and get user uid
      const idToken = authHeader.split("Bearer ")[1];
      try{
        const decodedToken = await getAuth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
      }
      catch(err){
        return res.status(401).json({error:"Invalid or expired token"})
      }
}

module.exports = validateFirebaseIdToken;