import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ unauthorized: "token not found" });

  const token = authorization?.split(" ");
  if (token.length !== 2)
    return res.status(401).json({ unauthorized: "Invalid token format" });

  jwt.verify(token[1], "access", (err, decoded) => {
    if (err) {
      return res.status(401).json({unauthorized:"Error while parsing token"});
    } else {
      if (!decoded) {
        return res.status(401).json({unauthorized: "Cannot decode token"});
      }
      req.user=decoded.sub.user
      next();
    }
  });
};
