// authorization.js
const authorizationMiddleware = (req, res, next) => {
    console.log(req.body)
    if (req.body.role === 'admin') {
      // User is an admin, proceed to the route handler
      next();
    } else {
      // User is not an admin, return a 403 Forbidden response
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authorizationMiddleware;
