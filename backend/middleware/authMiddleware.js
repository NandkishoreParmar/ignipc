const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Flatten nested roles array if needed
    const requiredRoles = roles.flat(); 
    
    console.log('User role:', req.user?.role);
    console.log('Required roles:', requiredRoles);

    if (!requiredRoles.includes(req.user?.role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
};