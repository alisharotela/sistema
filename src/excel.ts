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
  const uri = FileSystem.cacheDirectory + "fichas.xlsx";
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

export const writePDF = async (data) => {
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
  return data
    .map(
      (ficha) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ficha Médica</title>
  <style>
  
      body {
          font-family: Arial, sans-serif;
          margin: 40px;
          page-break-after: always; /* Esto asegura que cada ficha esté en una página separada al imprimir */
      }

      .ficha {
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
          border-bottom: 2px solid #2196F3;
          padding-bottom: 10px;
          margin-bottom: 20px;
      }

      .info-group {
          margin-bottom: 15px;
      }

      label {
          font-weight: bold;
      }

      .data {
          margin-left: 10px;
          font-size: 0.9em;
          color: #555;
      }

      .separator {
          height: 1px;
          background-color: #e0e0e0;
          margin: 20px 0;
      }

  </style>
</head>
<body>

<div class="ficha">
  <h2>Ficha Médica</h2>

  <div class="info-group">
      <label>ID Ficha:</label>
      <span class="data">${ficha.idFicha}</span>
  </div>
  <div class="info-group">
      <label>Fecha:</label>
      <span class="data">${new Date(ficha.fecha).toLocaleDateString()}</span>
  </div>

  <div class="separator"></div>

  <h2>Paciente</h2>
  <div class="info-group">
      <label>Nombre:</label>
      <span class="data">${ficha.paciente.nombre} ${
        ficha.paciente.apellido
      }</span>
  </div>
  <div class="info-group">
      <label>Email:</label>
      <span class="data">${ficha.paciente.email}</span>
  </div>
  <div class="info-group">
      <label>Teléfono:</label>
      <span class="data">${ficha.paciente.telefono}</span>
  </div>

  <div class="separator"></div>

  <h2>Doctor</h2>
  <div class="info-group">
      <label>Nombre:</label>
      <span class="data">${ficha.doctor.nombre} ${ficha.doctor.apellido}</span>
  </div>
  <div class="info-group">
      <label>Email:</label>
      <span class="data">${ficha.doctor.email}</span>
  </div>
  <div class="info-group">
      <label>Teléfono:</label>
      <span class="data">${ficha.doctor.telefono}</span>
  </div>

  <div class="separator"></div>

  <div class="info-group">
      <label>Motivo de Consulta:</label>
      <span class="data">${ficha.motivo_consulta}</span>
  </div>
  <div class="info-group">
      <label>Diagnóstico:</label>
      <span class="data">${ficha.diagnostico}</span>
  </div>
  <div class="info-group">
      <label>Categoría:</label>
      <span class="data">${ficha.categoria.descripcion}</span>
  </div>

</div>

</body>
</html>
  `
    )
    .join("");
};
