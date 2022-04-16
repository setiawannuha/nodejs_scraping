const { STUDENT_PAGE_URL } = require("./env");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

module.exports = (id) => {
  const filename = `${id}.html`;
  const filePath = `./public/students/${filename}`;
  const url = `${STUDENT_PAGE_URL}/${id}`;
  let browser;
  let data;
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath, "utf8");
    } else {
      try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, {
          waitUntil: "networkidle0",
        });

        const tableHTML = await page.$eval(
          'table[class="mtable table detail"]',
          (el) => el.innerHTML
        );
        data = "<table>" + tableHTML + "</table>";
        fs.writeFileSync(filePath, data);
      } catch (error) {
        reject({
          error,
          message: "Failed to find data, please check your NISN",
        });
      } finally {
        browser.close();
      }
    }
    if (!data) {
      reject({
        error: new Error("Data not found"),
        message: "Data not found",
      });
    } else {
      let $ = cheerio.load(data);
      const nisn = $(
        "table > tbody > tr:nth-child(1) > td:nth-child(2)"
      ).text();
      const name = $(
        "table > tbody > tr:nth-child(1) > td:nth-child(4)"
      ).text();
      const birthPlace = $(
        "table > tbody > tr:nth-child(1) > td:nth-child(6)"
      ).text();
      const gender = $(
        "table > tbody > tr:nth-child(1) > td:nth-child(5)"
      ).text();
      const address = $(
        "table > tbody > tr:nth-child(1) > td:nth-child(7)"
      ).text();
      const response = {
        noPendaftaran: id,
        noPeserta: nisn,
        nama: name,
        tempatLahir: birthPlace,
        alamat: address,
        jenisKelamin: gender,
      };
      resolve(response);
    }
  });
};
