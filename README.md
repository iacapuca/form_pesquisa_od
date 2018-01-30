# Clone de Formulário da Pesquisa Origem Destino 2017 - Recife
Formulário foi construido utilizando a estrutura inicial da página original, em conjunto com as seguintes técnologias:
  - node.js
  - express
  - formidable
  - nodemailer

O express serve como backend para um simples formulário, que ao ser preenchido e enviado tem seu body salvo como .csv, para que seja utilizando no scrapper.
Como implementações futuras, pensei em utilizar o nodemailer para enviar emails com o csv, em vez de salvar no dispositivo.
