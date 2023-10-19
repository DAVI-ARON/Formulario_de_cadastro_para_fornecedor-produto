
// Função para API do ViaCep
$(document).ready(function () {
    $('input[name="cep"]').on('input', function () { 
        
        var cep = $(this).val(); // Armazeno o valor do meu input nessa variável

        if (cep.length === 8) {
            // URL da API do ViaCEP
            var url = `https://viacep.com.br/ws/${cep}/json/`; // Realizo a interpolação da variável na url para fazer a requisição

            $.get(url, function (data) { // Começo a função de retorno da requisição
                if (data.cep) {
                    
                    // Aqui pego os dados de retorno e vou os colocando em seus respectivos campos
                    $('input[name="endereco"]').val(data.logradouro),
                    $('input[name="complemento"]').val(data.complemento),
                    $('input[name="bairro"]').val(data.bairro),
                    $('input[name="municipio"]').val(data.localidade),
                    $('input[name="estado"]').val(data.uf)

                } else {
                    $('#resultado').html('Não foi possível obter informações para o CEP fornecido.'); // Mensagem de erro caso o cep informado não esteja na viacep
                }
            });
        }else{ // Caso o usuário deseje trocar o cep, não vai bater os 8 caracteres e os campos são limpos para outra requisição
            $('input[name="endereco"]').val(''),
            $('input[name="complemento"]').val(''),
            $('input[name="bairro"]').val(''),
            $('input[name="municipio"]').val(''),
            $('input[name="estado"]').val('')
        }
    });
});

// Função para a multiplicação, valor total, adicionar e remover os produtos
$(document).ready(function() {
   
    // Calcula o valor total pela quantidade no estoque e valor unitário
    function calcularValorTotal() {
      var container = $(this).closest('.clone');
      //input[name^="qdtde_estoque"], como estou fazendo a clonagem dos campos, usei ^ para pegar o prefixo "qdtde_estoque", assim pegos todos os campos
      //que possuem ess inicio no name, já que para cada campo clonado, será acrescentado um identificador unico na frente do nome
      var qdtde = parseFloat(container.find('input[name^="qdtde_estoque"]').val()); 
      var valor_un = parseFloat(container.find('input[name^="valor_unitario"]').val());
  
      var valor_total = qdtde * valor_un;
      container.find('input[name^="valor_total"]').val(`R$ ${valor_total}`);
    }
  
    $('input[name^="valor_unitario"], input[name^="qdtde_estoque"]').on('input', calcularValorTotal);
  
    // Associando a função de cáuculo aos campos clonados
    $("#adc_produto").click(function() {

        var myLoading = $('#loading-master');
        // Aqui a tela de carregamento é exibida
        myLoading.show();
        
      // Começo a fazer a clonagem do primeiro elemento presente
      var novoProduto = $(".clone:first").clone(); 
  
      if (novoProduto.length > 0) {
        // Removi elementos que não devem ser clonados
        novoProduto.find(".no-clone").remove();
  
        // Limpei os valores dos campos clonados
        novoProduto.find('input').val("");
  
        // Modifiquei os atributos "name" para torná-los únicos a cada clonagem
        var novoNameProduto = 'produto' + Date.now();
        novoProduto.find('input[name^="produto"]').attr('name', novoNameProduto);

        var novoNameUnMedida = 'und_medida' + Date.now();
        novoProduto.find('select[name^="und_medida"]').attr('name', novoNameUnMedida);

        var novoNameUn = 'valor_unitario' + Date.now();
        novoProduto.find('input[name^="valor_unitario"]').attr('name', novoNameUn);

        var novoNameQdtde = 'qdtde_estoque' + Date.now();
        novoProduto.find('input[name^="qdtde_estoque"]').attr('name', novoNameQdtde);

        var novoNameT = 'valor_total' + Date.now();
        novoProduto.find('input[name^="valor_total"]').attr('name', novoNameT);
  
        // Associei a função aos campos clonados usando o prefixo deles: "valor_unitario" e "qdtde_estoque"
        novoProduto.find('input[name^="valor_unitario"], input[name^="qdtde_estoque"]').on('input', calcularValorTotal);
  
        // Inseri os clones antes do botão "Adicionar Produto"
        novoProduto.insertBefore($(this));

        // Parte de atraso e encerramento do loading
        setTimeout(function() {
            myLoading.hide();;
          }, 1000);
      }
    });
  
    // Quando o botão "excluir" é clicado a função inicia
    $("#produtos_fornecedor").on("click", "#excluir", function() {
      // Remove o campo
      $(this).closest(".clone").remove();
    });
});

// Função para adicionar, ver e excluir os anexos / Coletar os dados, armazenar e formar o JSON
$(document).ready(function () {

    // Pegando a lista de anexos
    const fileList = $('#fileList');
    // Usando um objeto para armazenar os dados dos arquivos
    const fileDataMap = {}; 

    // Evento de arrastar sobre a área de soltar
    $('.area_soltar').on('dragover', function (e) {

        e.preventDefault();
        // 'dragover' é um elemento que é acionado quando alguma coisa é arrastada sobre uma determinada área, no meu caso 'area_soltar'
        $(this).addClass('dragover');
    });

    // Evento de arrastar deixando a área de soltar
    $('.area_soltar').on('dragleave', function () {

        // 'dragleave' é um elemento que é acionado quando alguma coisa sai da área de arrastagem
        $(this).removeClass('dragover');
    });






    // Evento de soltar
    $('.area_soltar').on('drop', function (event) {

        event.preventDefault();
        $(this).removeClass('dragover');

        //está coletando os arquivos que foram arrastados e soltos na área de arraste
        const files = event.originalEvent.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            //Usada para armazenar um valor de data e hora atual único, que vai ser usado como identificador nos clones
            const fileId = Date.now();
            //Está recebendo o arquivo atual da coleção de arquivos que está sendo iterado
            const file = files[i];
            //Um objeto FileReader é instanciado. O FileReader é uma API que permite ler o conteúdo de arquivos
            const reader = new FileReader();

            reader.onload = function (event) {
                // Armazena os dados no objeto
                fileDataMap[fileId] = event.target.result;
                console.log('Conteúdo do arquivo:', event.target.result);
                console.log('Tipo MIME:', file.type);
            };

            //Está iniciando o processo de leitura do conteúdo do arquivo
            reader.readAsArrayBuffer(file);

            // Adiciona o arquivo à lista com opções Excluir e Visualizar
            const listItem = $('<li style="padding: 1em;"></li>');
            listItem.html(`
                <button data-id="${fileId}" class="delete btn" style= "background: red;"><img src="assets/img/fluigicon-trash.png" alt="Excluir" width="22em"></button>
                <button data-id="${fileId}" class="view btn btn-info"><img src="assets/img/visualizar.png" alt="Excluir" width="22em"></button>
                <span>${file.name}</span>
            `);
            fileList.append(listItem);
        }
        console.log('Arquivos armazenados no objeto:', fileDataMap);








    // Evento de mudança no campo de arquivo
    $('#fileInput').on('input', function () {

        const files = $(this).prop('files');

        for (let i = 0; i < files.length; i++) {
            const fileId = Date.now();
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function (event) {
                // Armazena os dados no objeto
                fileDataMap[fileId] = event.target.result;
                console.log('Conteúdo do arquivo:', event.target.result);
                console.log('Tipo MIME:', file.type);
            };

            reader.readAsArrayBuffer(file);

            // Adiciona o arquivo à lista com opções Excluir e Visualizar
            const listItem = $('<li style="padding: 1em;"></li>');
            listItem.html(`
                <button data-id="${fileId}" class="delete btn" style= "background: red;"><img src="assets/img/fluigicon-trash.png" alt="Excluir" width="22em"></button>
                <button data-id="${fileId}" class="view btn btn-info"><img src="assets/img/visualizar.png" alt="Excluir" width="22em"></button>
                <span>${file.name}</span>
            `);
            fileList.append(listItem);
            console.log('Arquivos armazenados no objeto:', fileDataMap);

        }
    });








 




// Evento de clique no botão "view"
fileList.on('click', '.view', function () {
    const fileId = $(this).data('id');
    const blobData = fileDataMap[fileId];
    console.log('Visualizar:', fileId);
    console.log('Conteúdo do arquivo:', blobData);

    if (blobData) {
        const blob = new Blob([blobData], { type: 'application/pdf' });

        // Verifica se o link de download já existe
        let link = document.getElementById('downloadLink');

        if (!link) {
            link = document.createElement('a');
            link.id = 'downloadLink';
            link.style.display = 'none';
            document.body.appendChild(link);
        }

        const url = window.URL.createObjectURL(blob);

        // Configura o link de download
        link.href = url;
        link.download = fileId; // Define o nome do arquivo para download

        // Simula um clique no link para iniciar o download
        link.click();

        // Cria um elemento iframe para visualizar o PDF
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%';
        iframe.style.height = '500px';

        // Limpa o conteúdo anterior e adiciona o iframe à página
        const viewerContainer = document.getElementById('ver');
        viewerContainer.innerHTML = '';
        viewerContainer.style.display = '';
        viewerContainer.appendChild(iframe);
    } else {
        console.error('Blob de dados não encontrado no objeto para o arquivo:', fileId);
    }

    console.log('Arquivos armazenados no objeto:', fileDataMap);
});







    // Evento de clique no botão "Excluir"
    fileList.on('click', '.delete', function () {
        const fileId = $(this).data('id');
        if (fileDataMap[fileId]) {
            delete fileDataMap[fileId];
            $(this).closest('li').remove();
            console.log('Excluir:', fileId);

            const iframe = document.getElementById('ver');
            if (iframe) {
            iframe.style.display = 'none';
            }
        }

        console.log('Arquivos armazenados no objeto:', fileDataMap);
    });
});









// Função de coleta de dados
function coletarDados() {
    const dados = {}; // Objeto para armazenar os dados coletados

    // Coleta dados dos campos de entrada
    $('#form input, #form select').each(function () {
        const nomeCampo = $(this).attr('name');
        const valorCampo = $(this).val();
        dados[nomeCampo] = valorCampo;
    });

    // Coleta dados dos arquivos da sessionStorage
    for (const key in fileDataMap) {
        const blobData = fileDataMap[key];
        const nomeArquivo = `arquivo_${key}.pdf`;
        dados[nomeArquivo] = blobData;
    }

    // Converte em uma string JSON
    const jsonDados = JSON.stringify(dados);

    return jsonDados;
}









// Função de salvar o fornecedor
$('#salvar_fornecedor').on('click', function () {
    const dadosJSON = coletarDados();
    console.log('Dados JSON:', dadosJSON);
});

function criarArquivoJSON(dados, nomeArquivo) {
    // Criei um novo objeto Blob com os dados JSON
    const blob = new Blob([dados], { type: 'application/json' });

    // Criei uma URL temporária para o Blob
    const url = window.URL.createObjectURL(blob);

    // Criei um elemento "a" para o link de download
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;

    // Simula um clique no link para iniciar o download
    link.click();

    // Revoga a URL temporária quando o download estiver completo
    window.URL.revokeObjectURL(url);
}


// Função de salvar o fornecedor / download do JSON
$('#salvar_fornecedor').on('click', function () {

    var loading_container = document.getElementById('loading-save');
    // Função de loading ao salvar
    loading_container.style.display = 'block';



    const dadosJSON = coletarDados(); // Usa a função que coleta os dados em formato JSON
    const nomeArquivo = 'dados.json'; // Nome do arquivo que vai ser baixado
    criarArquivoJSON(dadosJSON, nomeArquivo);

});



});