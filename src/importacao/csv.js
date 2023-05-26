import { parse } from "csv-parse";
import fs from "node:fs";

export default function importCsv(file) {
  
  // Array para armazenar os dados do CSV
  const results = [];

  // Função para ler o arquivo CSV
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => {
      // Aqui você pode processar cada linha do CSV conforme necessário
      results.push(data);
    })
    .on("end", () => {
      // Após terminar de ler o arquivo CSV, faça o que quiser com os dados
      console.log(results); // Exemplo: exibir os dados no console
    })
    .on("error", (error) => {
      // Trate possíveis erros durante a leitura do arquivo
      console.error(error);
    });
}
