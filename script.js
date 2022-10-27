let usuario;
//pergunta o nome que o usuario deseja
function insiranome(){
    usuario = {
        name:prompt("digite seu nome")
    };
    //manda o nome para a api
    const entrar = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',usuario);
    entrar.then(pegarmensagens);
    entrar.catch(insiranome);
}
let info = []; //contem as informaçoes das mensagens da api

function pegarmensagens(){
    //pede informaçoes das mensagens da api
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    //chama a função que colocara as mensagens da api dentro de info
    promessa.then(respostaChegou);
}
function respostaChegou(resposta){
    //atribui as mensagens a array info
    info = resposta.data;
    
    renderizarmensagens();//imprime as mensagens
}
function renderizarmensagens(){

    const chat = document.querySelector('ul');

    chat.innerHTML = '';
    
    for(let i =0; i < info.length; i++){

        let mensagem = info[i];

        switch(mensagem.type){
            //imprime mensagens para todos
            case 'message':
            chat.innerHTML += `
                <li>
                    ${mensagem.time} ${mensagem.from} para ${mensagem.to}: ${mensagem.text}
                </li>`;
            break;
            case 'status':
            //imprime mensagens de entrada/saida
            chat.innerHTML += `
                <li class = "status">
                    ${mensagem.time} ${mensagem.from} ${mensagem.text}
                </li>`;
            break;
            case 'private_message':
            //imprime mensagens para um usuario especifico
            chat.innerHTML += `
                <li class = "reservada">
                    ${mensagem.time} ${mensagem.from} reservadamente para ${mensagem.to}: ${mensagem.text}
                </li>`;
            break;
        }
    }
}
//envia a mensagem para a api
function enviar() {
    const texto = document.querySelector("input").value;
    const msg = {
        from: usuario.name,
        to: "Todos",
        text: texto,
        type: "message"
    };
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',msg);
    renderizarmensagens();
}
function manter(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
}
insiranome();
setInterval(renderizarmensagens, 3000);
setInterval(manter, 5000);