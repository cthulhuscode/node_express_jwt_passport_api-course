import { Strategy } from "passport-local";
import { UsersService } from "../../../services";
import boom from "@hapi/boom";
import { verifyPassword } from "../../bcrypt";

const service = new UsersService();

// done() is a function that we execute if everything goes well or not
export const LocalStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (username, password, done) => {
    try {
      const user = await service.findByEmail(username);

      if (!user) done(boom.unauthorized("Email or password incorrect."), false);

      const isPasswordValid = await verifyPassword(
        password,
        user.dataValues.password
      );

      if (!isPasswordValid)
        done(boom.unauthorized("Email or password incorrect."), false);

      delete user.dataValues.password;

      // User is added to the request
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
