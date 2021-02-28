import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import { resolve } from 'path'
import fs from 'fs'

class SendMailService {
  private cliente: Transporter
  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
      this.cliente = transporter
    })
  }

  async execute(to: string, subject: string, body: string) {
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
    const templateFileContent = fs.readFileSync(npsPath).toString('utf-8')
    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse({name: to, title: subject, description: body})
    const message = await this.cliente.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreply@nps.com.br>"
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()