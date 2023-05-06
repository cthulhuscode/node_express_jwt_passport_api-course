import boom from "@hapi/boom";
import nodemailer from "nodemailer";
import { UsersService } from "./users.service";
import { verifyPassword } from "../utils/bcrypt";
import { Roles } from "../utils/roles";
import { signToken } from "../utils/jwt";
import { config } from "../config";

const service = new UsersService();

export class AuthService {
  async handleLogin(email: string, password: string) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized("Email or password incorrect.");

    const isPasswordValid = await verifyPassword(
      password,
      user.dataValues.password
    );

    if (!isPasswordValid)
      throw boom.unauthorized("Email or password incorrect.");

    delete user.dataValues.password;

    return user;
  }

  signToken(user: { userId: number; customerId: number; role: typeof Roles }) {
    const { userId, customerId, role } = user;

    // Generate tokenx
    const payload = {
      sub: { userId, customerId },
      role,
    };

    const token = signToken(payload);

    return {
      user,
      token,
    };
  }

  async sendEmail(email: string) {
    const user: any = await service.findByEmail(email);

    if (!user) throw boom.unauthorized("Not authorized.");

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.emailFrom,
        pass: config.googleAppPassword,
      },
    });

    const info = await transporter.sendMail({
      from: config.emailFrom, // sender address
      to: user.email, // list of receivers
      subject: "Testing email sending from Nodemailer", // Subject line
      text: "Testing this out", // plain text body
      html: "<h1>Greetings from Cthulhu xD</h1>", // html body
    });

    if (!info.accepted.length || info.rejected.length)
      throw boom.internal(
        "There was a problem sending the email. Please try again later."
      );

    return {
      msg: "Email sent successfully.",
    };
  }
}
