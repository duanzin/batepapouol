let usuario = prompt("digite seu nome");

//array com as informaçoes do api
let info = []; 
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promessa.then(respostaChegou);

function respostaChegou(resposta){
    info = resposta.data;
    
    //imprime as mensagens
    rederizarmensagens();
}
function rederizarmensagens(){

    const chat = document.querySelector('ul');

    chat.innerHTML = '';
    
    for(let i =0; i < info.length; i++){

        let mensagem = info[i];

        switch(mensagem.type){
            case 'message':
            chat.innerHTML += `
                <li>
                    ${mensagem.time} ${mensagem.from} para ${mensagem.to}: ${mensagem.text}
                </li>`;
            break;
            case 'status':
            chat.innerHTML += `
                <li class = "status">
                    ${mensagem.time} ${mensagem.from} ${mensagem.text}
                </li>`;
            break;
            case 'private_message':
            chat.innerHTML += `
                <li class = "reservada">
                    ${mensagem.time} ${mensagem.from} reservadamente para ${mensagem.to}: ${mensagem.text}
                </li>`;
            break;
        }
    }

}
rederizarmensagens();