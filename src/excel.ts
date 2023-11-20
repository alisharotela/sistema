import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const writeExcel = async (data) => {
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Fichas");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + "factura.xlsx";
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "Exportar fichas",
    UTI: "com.microsoft.excel.xlsx",
  });
};

import * as Print from "expo-print";
import { Ficha } from "./interfaces/Ficha";

export const writePDF = async (data: Ficha) => {
  const uri = await Print.printToFileAsync({
    html: generateHTML(data),
  });
  await Sharing.shareAsync(uri.uri, {
    mimeType: "application/pdf",
    dialogTitle: "Exportar fichas",
    UTI: "com.adobe.pdf",
  });
};

const generateHTML = (data) => {
  console.log({ data });
  return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Facturas</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 80%;
                  margin: 20px auto;
                  background: #fff;
                  padding: 15px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .factura {
                  border-bottom: 1px solid #eee;
                  padding-bottom: 10px;
                  margin-bottom: 10px;
              }
              .factura:last-child {
                  border-bottom: none;
              }
              .titulo {
                  font-size: 24px;
                  color: #333;
                  margin-bottom: 10px;
              }
              .detalle, .total {
                  font-size: 18px;
                  color: #666;
                  margin: 5px 0;
              }
              .total {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              ${data
                .map(
                  (factura) => `
                  <div class="factura">
                      <div class="titulo">Factura Número: ${
                        factura.numeroFactura
                      }</div>
                      <div class="detalle">Cliente: ${factura.cliente.nombre} ${
                    factura.cliente.apellido
                  }</div>
                      <div class="detalle">Fecha: ${new Date(
                        factura.fecha
                      ).toLocaleDateString()}</div>
                      <div class="detalle">Producto: ${
                        factura.producto.nombre
                      }</div>
                      <div class="detalle">Cantidad: ${factura.cantidad}</div>
                      <div class="detalle">Precio Unitario: $${
                        factura.producto.precio
                      }</div>
                      <div class="total">Total: $${factura.total}</div>
                  </div>
              `
                )
                .join("")}
          </div>
      </body>
      </html>
    `;
};
