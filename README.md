
<h2 align="center">
  Desafio Front-End
</h2>


## 🚀 Sobre o desafio

O objetivo deste desafio é avaliar meus conhecimentos técnicos, como lido com os requisitos e capacidade de pensar em soluções.

Durante esse desafio construi um formulário para cadastro de fornecedores e produtos.

O desenvolvimento do formulário seguiu o layout existente na guia: **Layout**


## 📋 Requisitos


- **HTML**: na versão 5;
- **JAVASCRIPT**: Dar preferência a ao ECMA-6 no desenvolvimento do código; 
- **BOOTSTRAP**:  
  - [CSS](https://fluig.totvs.com/style-guide/css/fluig-style-guide.min.css)
  - [JQUERY-3.5.1 ](https://jquery.com/download/)


## 📌 Melhorias e coisas a mais aplicadas por mim
- **Área de arrastar e soltar o arquivo**: Além do botão para adicionar um arquivo criei uma área de arraste para o usuário poder adicionar seu arquivo 🚀
- **Mascara nos campos**: Adicionei com JQuery máscaras em alguns campos do formulário para ficar bem formatado no JSON 🚀
- **Carregamento ao criar novo produto**: Coloquei uma tela de loading para adicionar um produto  🚀
- **Visualizar o arquivo na página**: Assim que o usuário clica para ver o arquivo adicionado, além do download do arquivo sera aberto logo abaixo dele uma visualização do mesmo 🚀
- **Tela de conclusão de cadastro**: Criei uma tela de conclusão de cadastro para quando o usuário finalizar o mesmo 🚀
 

### Sobre o preenchimento dos campos existentes no formulário de cadastro

- **Razão Social**: obrigatório
- **Nome Fantasia**: obrigatório
- **CNPJ**: obrigatório
- **Inscrição Estadual**: opcional
- **Inscrição Municipal**: opcional
- **Endereço**: obrigatório (deve ser preenchido automaticamente usando a API via CEP)
- **Nome da pessoa de contato**: obrigatório
- **Telefone**: obrigatório
- **E-mail**: obrigatório
- **Tabela de Produtos**: obrigatório a inclusão de pelo menos 1 item
  - **Descrição**: obrigatório
  - **Unidade de Medida**: obrigatório
  - **Quantidade em Estoque**: obrigatório
  - **Valor Unitário**: obrigatório
  - **Valor Total**: obrigatório (bloqueado, deve ser preenchido automaticamente considerando o valor unitário x a quantidade em estoque)
- **Tabela de Anexos**: obrigatório a inclusão de pelo menos 1 documento
  - Os documentos anexados deverão ser armazenados em memória (blob e session storage) para envio
  - O Botão Excluir (lixeira) - Ao excluir o documento, deverá ser excluído da memória
  - O Botão Visualizar (olho) - Ao visualizar o documento, deve ser feito o download
- **Botão Salvar Fornecedor**: ao clicar no botão, deverá ser aberto modal de loading de envio, e deverá ser formatado um JSON com os dados a serem enviados
  - **OBS Sobre o JSON**: o JSON de resultado pode ser baixado ou apenas exibido no console do browser.

## 🎨 Layout

O layout do desafio está em anexo na pasta [assets/Layout](./assets/Layout) deste repositório.
