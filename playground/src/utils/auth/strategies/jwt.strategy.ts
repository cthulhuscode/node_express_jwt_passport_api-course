import boom from "@hapi/boom";
import { verifyPassword } from "../../bcrypt";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "../../../services";
import { config } from "../../../config";

const service = new UsersService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});
