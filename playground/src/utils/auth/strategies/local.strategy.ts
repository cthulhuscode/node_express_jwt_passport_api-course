import { Strategy } from "passport-local";
import { AuthService } from "../../../services/auth.service";

const service = new AuthService();

// done() is a function that we execute if everything goes well or not
export const LocalStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (email, password, cb) => {
    try {
      const user = await service.handleLogin(email, password);

      // Invalid credentials
      if (!user) cb(null, false);

      // User is added to the request
      cb(null, user);
    } catch (error) {
      // Send error
      cb(error);
    }
  }
);
