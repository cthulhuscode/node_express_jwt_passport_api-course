import boom from "@hapi/boom";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
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

  async sendPasswordRecovery(emailAddress: string) {
    const user: any = await service.findByEmail(emailAddress);

    if (!user) throw boom.unauthorized("Invalid email.");

    const payload = {
      sub: { userId: user.id, customerId: user.customer.id },
    };

    // Token expires in 15 minutes
    const token = jwt.sign(payload, config.jwtSecret!, {
      expiresIn: "15min",
    });
    const url = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });

    const emailDetails = {
      from: config.emailFrom, // sender address
      to: emailAddress, // list of receivers
      subject: "Recover your account's password", // Subject line
      html: `<h3>Click the link below to recover your password.</h3>
        <br><br>
        <p>${url}</p>`, // html body
    };

    const res = await this.sendEmail(emailDetails);

    return res;
  }

  async sendEmail(email: any) {
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

    const info = await transporter.sendMail(email);

    if (!info.accepted.length || info.rejected.length)
      throw boom.internal(
        "There was a problem sending the email. Please try again later."
      );

    return {
      msg: "Email sent successfully.",
    };
  }
}
