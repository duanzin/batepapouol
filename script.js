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
    
    info = resposta.data;//atribui as mensagens a array info
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
                    <span class="cinza">(${mensagem.time})</span> &nbsp <span class="bold">${mensagem.from}</span> &nbsppara&nbsp <span class="bold">${mensagem.to}</span>: ${mensagem.text}
                </li>`;
            break;
            case 'status':
            //imprime mensagens de entrada/saida
            chat.innerHTML += `
                <li class = "status">
                <span class="cinza">(${mensagem.time})</span> &nbsp <span class="bold">${mensagem.from}</span> &nbsp${mensagem.text}
                </li>`;
            break;
            case 'private_message':
            //imprime mensagens para um usuario especifico
            chat.innerHTML += `
                <li class = "reservada">
                <span class="cinza">(${mensagem.time})</span> &nbsp <span class="bold">${mensagem.from}</span> &nbspreservadamente para&nbsp <span class="bold">${mensagem.to}</span>: ${mensagem.text}
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
    const mandar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',msg);
    mandar.then(pegarmensagens);
    
    const aparece = document.querySelector("ul");
    aparece.lastElementChild.scrollIntoView();
    document.querySelector("input").value = '';
}
function manter(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
}
insiranome();
setInterval(pegarmensagens, 3000);
setInterval(manter, 5000);