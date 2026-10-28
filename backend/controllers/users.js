import User from "../models/user.js";

const signup = async (req, res, next) => {

    await User.deleteMany({});
    try {
        const { password } = req.body;

        const newUser = new User(req.body);
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {

            if (err) {
                return next(err);
            } else {
                res.status(201).json({
                    isAuthenticated: true,
                    user: registeredUser
                });
            }
        });

    } catch (err) {
        console.log(err)
    }
}

const auth = async (req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.status(200).json({
            isAuthenticated: false
        });
    }

    const user = req.user;

    res.json({
        isAuthenticated: true,
        user: user
    });
}

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        return res.status(200).json({
            isAuthenticated: false
        });
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const authenticate = User.authenticate();

    authenticate(email, password, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Invalid email or password"
            });
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            } else {
                res.json({
                    isAuthenticated: true,
                    user: user
                });
            }
        })

    });

}

const updateUser = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "User must be logged in."
        });
    }

    try {
        const { name, contactNo, college, course, institution, domain } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            {
                $set: {
                    username: name,
                    contactNo: contactNo,
                    college: college,
                    institution: institution,
                    domain: domain,
                    course: course
                }
            },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({ user: updatedUser });

    } catch (err) {
        return next(err);
    }
};




export default { signup, auth, logout, updateUser, login };


