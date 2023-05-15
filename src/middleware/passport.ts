let userData: object = {};
import { Strategy } from 'passport-local'
import passport from 'passport'
import { loginUser } from '../dbActions/user'
export const auth = () => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (userData: object, done: any) {
        done(null, userData);
    });

    // used to deserialize the user
    passport.deserializeUser(function (userData: object, done: any) {
        done(null, userData);
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local', new Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        async function (req, email, password, done) {
            var result = await loginUser(email, password);
            console.log(result);
            if (result[0].length !== 0) {
                userData = result[0][0]
                return done(null, userData);
            } else {
                return done(null);
            }
        }
    ));




};