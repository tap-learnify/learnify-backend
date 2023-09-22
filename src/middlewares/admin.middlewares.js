const adminMiddleware = (req, res, next) => {
  // Check if the user has been authenticated by the authMiddleware
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Admin authorization required" });
  } else {
    next();
  }
};

module.exports = adminMiddleware;
