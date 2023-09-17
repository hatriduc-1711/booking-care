import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_APP_PASSWORD } from '~/constants/variable.constants';
import { IForgotPassword } from '~/interfaces/email.interface';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_APP_PASSWORD,
  },
});

const sendEmailForgotPassword = async (data: IForgotPassword) => {
  await transporter.sendMail({
    from: `"Forgot password 👻" <${EMAIL}>`,
    to: data.email,
    subject: 'Forgot password 👻',
    text: 'Forgot password',
    html: `
      <p> Xin chào ${data.name} </p>
      <p>Bạn nhận được email này vì có yêu cầu quên mật khẩu.</p>
      <p>Nếu thông tin chính xác vui lòng click vào link bên dưới để đổi đặt lại mật khẩu.</p>
      <a href=${data.url} target="_blank">Reset password</a>
    `,
  });
};

export default { sendEmailForgotPassword };
