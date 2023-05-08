import boom from "@hapi/boom";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { UsersService } from "./users.service";
import { verifyPassword } from "../utils/bcrypt";
import { Roles } from "../utils/roles";
import { signToken, verifyRecoveryToken } from "../utils/jwt";
import { config } from "../config";
import { hashPassword } from "../utils/bcrypt";
import { sequelize } from "../libs";

const userService = new UsersService();
const {
  models: { User },
} = sequelize;

export class AuthService {
  async handleLogin(email: string, password: string) {
    const user = await userService.findByEmail(email);

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

  signToken(user: {
    userId: number;
    customerId: number | null;
    role: typeof Roles;
  }) {
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
    const user: any = await User.scope("withRecoveryToken").findOne({
      where: { email: emailAddress },
      include: ["customer"],
    });

    if (!user) throw boom.unauthorized("Invalid email.");

    if (user.recoveryToken) {
      const isTokenValid = verifyRecoveryToken(user.recoveryToken);

      if (isTokenValid)
        throw boom.unauthorized(
          "You must wait 15 minutes before requesting an account recovery."
        );
    }

    const payload = {
      sub: { userId: user.id, customerId: user.customer.id },
    };

    // Token expires in 15 minutes
    const token = jwt.sign(payload, config.recoveryJwtSecret!, {
      expiresIn: "15min",
    });
    const url = `http://localhost:3000/recovery?token=${token}`;
    await userService.update(user.id, { recoveryToken: token });

    const emailDetails = {
      from: config.emailFrom, // sender address
      to: emailAddress, // list of receivers
      subject: "Recover your account's password", // Subject line
      html: `<h3>Click the link below to create a new password</h3>
        <br><p>Note: the token will expire in 15 minutes.</p><br>
        <p>${url}</p>`, // html body
    };

    const res = await this.sendEmail(emailDetails);

    return res;
  }

  async sendEmail(email: any) {
    const user: any = await userService.findByEmail(email.to);

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

  async changePassword(newPassword: string, token: string) {
    // Get the userId
    const payload: any = verifyRecoveryToken(token);

    // Find the user
    const user: any = await User.scope("withRecoveryToken").findByPk(
      payload.sub.userId,
      {
        include: "customer",
      }
    );

    // Verify token is correct
    if (user.recoveryToken !== token) throw boom.unauthorized("Invalid token.");

    const hashedPassword = await hashPassword(newPassword);

    await userService.update(user.id, {
      recoveryToken: null!,
      password: hashedPassword,
    });

    return {
      msg: "Password changed successfully!",
    };
  }
}
