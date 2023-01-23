import path from "path"
import fs from "fs"
import ejs from "ejs"
import pdf from "html-pdf"

export default async function handler(req, res) {

  const templatesDir = path.join(process.cwd(), 'templates');
  var html = fs.readFileSync(templatesDir + '/toPdf.html', 'utf8');
  var options = { format: 'A4', base: "http://" + req.headers.host, dpi: "300", };

  let renderedHtml = ejs.render(html, { form: req.body })

  return new Promise((resolve, reject) => {
    pdf.create(renderedHtml, options).toBuffer(function (err, buff) {
      if (err) {
        res.status(404).json({ error: err.message })
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=signed agreement.pdf');
        res.status(250).send(Buffer.from(buff)); // { filename: '/app/businesscard.pdf' }
      }
      resolve();
    });

  })
}