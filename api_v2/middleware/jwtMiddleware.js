const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = { userId: decodedToken.userId, email: decodedToken.email, role: decodedToken.role };
      next();
    } catch (err) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
