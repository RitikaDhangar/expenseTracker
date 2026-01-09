import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
export const PuppeteerCode = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  try {
    const title = "From PuppeterFile";
    const body = "this is body";
    const templatePath = path.join(__dirname, "common", "htmltemplate.html");
    let html = fs.readFileSync(templatePath, "utf-8");
    html = html.replace("{title}", title).replace("{body}", body);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10px",
        bottom: "10px",
        left: "10px",
        right: "10px",
      },
    });
    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=custom.pdf",
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    return res.json({ data: [], message: "Something went wrong", success: 1 });
  }
};
