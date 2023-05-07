import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "../../../services";
import { config } from "../../../config";

const service = new UsersService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.loginJwtSecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});
