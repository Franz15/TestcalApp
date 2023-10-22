const nodemailer = require("nodemailer");

const email = {
  user: "vallinas15@gmail.com",
  pass: "cijn udhu lvgf klsp",
};

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email.user,
    pass: email.pass,
  },
});

const sendEmail = async (newUser, subject, html) => {
  try {
    await transporter.sendMail({
      from: `TestcalApp <${email.user}>`, // sender address
      to: newUser.email, // list of receivers
      subject, // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });
  } catch (e) {
    console.log(e);
  }
};

const getTemplate = (user, token) => {
  return `
    <head>
    <title>Verificación de Correo Electrónico - TestcalApp</title>
</head>
<body>
    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="background-color: #f4f4f4; padding: 20px;">
                <table width="600" style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 4px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" style="background-color: #007BFF; color: #fff; padding: 20px 0;">
                            <img src="URL_DEL_LOGO" alt="TestcalApp Logo" style="width: 100px; height: 100px;">
                            <h1>Verificación de Correo Electrónico</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p>Hola, ${user.nombre}</p>
                            <p>Gracias por registrarte en TestcalApp. Para verificar tu dirección de correo electrónico, por favor haz clic en el siguiente enlace:</p>
                            <p><a href= http://localhost:5555/api/user/confirm/+${token} style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verificar Correo Electrónico</a></p>
                            <p>Si no has creado una cuenta en TestcalApp, puedes ignorar este correo electrónico.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                            <p>Si tienes algún problema al hacer clic en el botón de verificación, copia y pega el siguiente enlace en tu navegador: http://localhost:5555/api/user/confirm/+${user.token}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
`;
};

module.exports = {
  sendEmail,
  getTemplate,
};
