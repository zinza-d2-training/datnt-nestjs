import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { UserSignup } from '../auth/types';

// interface User extends UserSignup {
//   id: number;
// }

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const { username, emailAddress } = user;
    const url = `${process.env.APP_URL}/auth/confirm?email=${emailAddress}&token=${token}`;

    await this.mailerService.sendMail({
      to: emailAddress,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: username,
        url,
      },
    });
  }
}
