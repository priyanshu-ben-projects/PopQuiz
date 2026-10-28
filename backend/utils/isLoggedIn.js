
import CustomError from "./CustomError.js";

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new CustomError(401, "You must be logged in"));
    }

    next();
};


export default isLoggedIn;
