import passport from "passport";
import { LocalStrategy } from "./strategies";

passport.use(LocalStrategy);

export default passport;
