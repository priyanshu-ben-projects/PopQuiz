import User from "../models/user.js";

const signup = async (req, res, next) => {

    try {
        const { password } = req.body;

        //    await User.deleteMany({});
        const newUser = new User(req.body);
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            } else {
                res.status(201).json({ message: "Account created successfully" });
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




export default { signup, auth, logout, login };


