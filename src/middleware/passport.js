require('dotenv').config()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt');
const db = require("../models");
const GooglePlusTokenStrategy = require('passport-google-plus-token')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: process.env.REFRESH_JWT

}, async(jwt_payload, done) => {
   try {
    if(!jwt_payload) {
        done(null, false)
    }
    let data = await db.User.findOne({
        where: {refreshtoken: jwt_payload.id} 
    })
    if(data) {

        done(null, data)
    } else {
        done(null, false)
    }
   } catch (error) {
    done(error, false)
   }
   
}));
passport.use(new GooglePlusTokenStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.SECRETCODE,
    passReqToCallback: true
}, async(accessToken, refreshToken, profile, next) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
}));