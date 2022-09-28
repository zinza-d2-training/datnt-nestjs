import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { UserSignup } from '../auth/types';

// interface User extends UserSignup {
//   id: number;
// }

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, url: string, pathTemplate: string) {
    const { username, emailAddress } = user;

    await this.mailerService.sendMail({
      to: emailAddress,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: `./${pathTemplate}`,
      context: {
        name: username,
        url,
      },
    });
  }
}
