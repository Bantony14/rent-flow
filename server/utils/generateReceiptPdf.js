import puppeteer from "puppeteer";
import receiptTemplate from "./receiptTemplate.js";

export const generateReceiptPdf = async (data) => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(receiptTemplate(data));

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
    });

    await browser.close();

    return pdfBuffer;
};