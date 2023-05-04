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
  if (!payload)
    done(
      boom.unauthorized("You don't have permission to access to this route"),
      false
    );

  return done(null, payload);
});
