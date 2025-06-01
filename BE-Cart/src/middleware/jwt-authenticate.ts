const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // embed role
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '1h' }
  );
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    console.log('Decoded user:', user); // Log the decoded user data
    req.user = user; // attach user data to request
    next();
  });
};

const clearToken = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie

}

export { generateToken, authenticateJWT, clearToken };

