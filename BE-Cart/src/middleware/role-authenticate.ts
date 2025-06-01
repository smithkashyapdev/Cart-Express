import { UserRole } from "../models/Users";

const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    console.log('user->', req.user)
    next();
  };
};

export default authorizeRoles;