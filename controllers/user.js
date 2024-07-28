
const User = require("../models/user.js");

module.exports.renderSignupForm =(req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // Make sure to return to prevent further execution
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login =  (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged In!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);

}


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are now logged out.");
        res.redirect("/listings");
    });
}