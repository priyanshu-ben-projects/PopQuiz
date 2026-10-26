import User from "../models/user.js";

const signup = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        await User.deleteMany({});
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

    // const { username } = req.session;
    console.log(req.isAuthenticated())

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            isAuthenticated: false
        });
    }

    res.json({
        isAuthenticated: true,
        user: {
            email: req.user.email
        }
    });
}

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        return res.status(401).json({
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
                console.log(user);
                res.send(req.isAuthenticated());
            }
        })

    });

}




export default { signup, auth, logout, login };


