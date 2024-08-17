import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import google from "passport-google-oauth20";
import { createHash, validatePassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import envs from "./envs.config.js";
import { loggedUserDto } from "../dto/loggedUser.dto.js";
import usersRepository from "../persistence/mongoDB/users.repository.js";
import cartRepository from "../persistence/mongoDB/cart.repository.js";


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


export const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy({ passReqToCallback: true, usernameField: "email"}, async( req, username, password, done) => {
            try {
                const { first_name, last_name, age, role } = req.body;
                const user = await usersRepository.getUser(username);
                if (user) return done(null, false, { msg: "El usuario ya se encuentra registrado" })

                const cart = await cartRepository.createCart()

                const newUser = {
                    first_name,
                    last_name,
                    password: createHash(password),
                    email: username,
                    age,
                    role: role,
                    cart: cart._id,
                }

                const userCreated = await usersRepository.createUser(newUser)
                
                return done(null, userCreated)

            } catch(error){
                return done(error)
            }
        })
    );

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email"}, async(username, password, done) => {
            try {
                const user = await usersRepository.getUser(username);

                if (!user || !validatePassword(user.password, password)) return done(null, false, {msg: "Usuario o contraseña incorrectos"})

                const loggedUser = loggedUserDto(user)

                return done(null, loggedUser)

            } catch(error) {
                done(error)
            }
        })
    )

    passport.use(
        "jwt",
        new JWTStrategy(
            {jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envs.JWT_SECRET_CODE }, async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload)
                } catch(error) {
                    return done(error);
                }
            }    
        )
    )

    passport.use(
        "googleLogin",
        new GoogleStrategy(
            {
                clientID: envs.GOOGLE_CLIENT_ID,
                clientSecret: envs.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:8080/api/sessions/googlelogin",
            },
            async(accessToken, refreshToken, profile, cb) => {
                try {
                    const { name, emails } = profile;
                    const user = await usersRepository.getUser(emails[0].value)

                    if(user) {
                        return cb(null, user)
                    } else {
                        const newUser = {
                            first_name: name.givenName,
                            last_name: name.familyName,
                            email: emails[0].value
                        }

                        const userCreated = await usersRepository.createUser(newUser);
                        return cb(null, userCreated);
                    } 
                } catch(error) {
                    return cb(error);
                }
            }
        )

    )

// Serialización

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await usersRepository.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

}