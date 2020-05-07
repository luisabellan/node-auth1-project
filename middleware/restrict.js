const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");

function restrict() {
  const authError = {
    message: "Invalid credentials",
  };

  return async (req, res, next) => {
    try {
      //

      // we set `req.session.user` when the user is authenticated in `/login`.
      // so we know if it's not set, the user isn't authenticated yet.
      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  // sessions,
  restrict,
};
