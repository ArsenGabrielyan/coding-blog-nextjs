import {createTransport} from "nodemailer";

const USER = process.env.BASE_EMAIL;

const getHtml = (link,user) =>`<h1>Reset Your Password</h1>
<p>Hey ${user.name.split(' ')[0]}! Seems Like You Forgot Your Password. If It is True, Click on the Link Below To Reset Your Password</p>
<a href="${link}" style="font-size: 21px; color:#167051">Reset Password</a>
<p>If You Didn't Forget Your Password, You can Simply Ignore This Message.</p>`;

export const sendEmail = async(user,email,subject,text)=>{
     const transporter = createTransport({
          service: 'gmail',
          auth: {
               user: USER,
               pass: process.env.BASE_PASS
          }
     })
     transporter.sendMail({
          from: USER,
          to: email,
          subject,
          html: getHtml(text,user)
     },(err,info)=>{
          if(err) console.error("email didn't sent because of a following error: " + err);
          else console.info(`email sent to ${email}: ${info.response}`)
     });
}