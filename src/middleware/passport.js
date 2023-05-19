const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt');
const db = require("../models");


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: 'alo'

}, async(jwt_payload, done) => {
   try {
    if(!jwt_payload) {
        done(null, false)
    }
    let data = await db.User.findOne({
        where: jwt_payload.id
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