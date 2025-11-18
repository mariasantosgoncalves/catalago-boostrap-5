const CATALOGO_ITEMS = [
    {
        id: 1,
        titulo: "o casamento sangrento",
        categoria: "livros",
        detalhes: "um casamento que tinha tudo pra ser bom e virrou um terror de sangue!,mais prepare-se para a reviravolta da familia. ediçao de capa dura",
        preco: "R$ 49,00",
        estoque: "15",
        autor: "guy busick e R. cristopher murphy",
        lancamento:"2019"
    },
    {
        id: 2,
        titulo: "frozen",
        categoria: "livros",
        detalhes: "o casamento de anna e kristoff e a chegada de um novo menbro na familia real.",
        preco: "R$ 49,00",
        estoque: "150",
        autor: "jennifer lea",
        lancamento:"2018"
    },
    {
        id: 3,
        titulo: "moana um mar de aventuras!",
        categoria: "livros",
        detalhes: "moana é sobre uma jovem aventureira de uma ilha na polinesia,que é escolhida pelo oceano para uma missao perigosa,para encontrar um semideus maui e etc!",
        preco: "R$ 49,00",
        estoque: "67",
        autor: "john musker e ron clements",
        lancamento:"2024"
    },
    {
        id: 4,
        titulo: " A paixao de Cristo",
        categoria: "livros",
        detalhes: " narra as ultimas 12 horas de vida de jesus com foco em sua agonia,flagelaçao e crusificaçao de maneira visceral e realista! ",
        preco: "R$ 49,00",
        estoque: "15",
        autor: "benedict fitzgerald e mel gibson",
        lancamento:"2019"
    }
]; 

/**
* adiciona listeners aos botoes "ver detalhes" para popular o modal dinamicamente 
*/
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

//1.ouvinte para popular o modal ANTES  de ser exibido
modalElement.addEventListener('show.bs.modal', function (event){
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    //procura pelo ID do item clickando no vetor "CATALOG_ITEMS"
    const item = CATALOGO_ITEMS.find(i => i.id === itemId);
    
    //se o item foi encontrado no vetor "CATALOG_ITEMS"
    if(item) {
        //atualiza o titulo da modal
        modalTitle.textContent = item.titulo;
        
        //criar HTML de detalhes 
        let detailsHTML = `
        <p class="mb-1"><strong>categorias:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
        <p class="fs4 fw-bold text-success mb-3">preco: ${item.preco}</p>
        <hr>
        <p>${item.detalhes}</p>
        `;
        
        //adiciona campos especificos por categoria 
        if(item.categoria == 'livros') {
            detailsHTML += `<p><strong>autor:</strong>${item.autor}</p>`;
            detailsHTML += `<p><strong>lançamento:</strong>${item.lancamento}</p>`;
            detailsHTML += `<p class="text-info"><strong>estoque disponivel:</strong>${item.estoque} unidades</p>`;
        }else if (item.categoria == 'artesanatos'){
            detailsHTML += `<p><strong>material:</strong>${item.material}</p>`;
            detailsHTML += `<p><strong>dimensões/comprimento:</strong>${item.dimensoes || item.comprimento}</p>`;
            detailsHTML +=  `<p class="text-info"><strong>pecas esclusivas em estoque:></strong>${item.estoque} unidades</p>`;
        }
        
        //insire o HTML no corpo modal
        modalBody.innerHTML = detailsHTML;
        
        // ao cliclar no botao "adicionar ao carrinho"
        modalAction.onclick = () => {
            //em uma aplicacao real,voce faria uma chamada de API aqui.
            // para este exemplo, apenas adicionamos o item ao carrinho mostramos o log e fechamos o modal
            adicionarItemCarrinho(item.id);
            console.log(`acao:item'${item.titulo}'' (ID: ${item.id}) adicionado ao carrinho.`);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        }
    }
});

// 2. ouvinte para afuncionalidade dea busca (simples)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    //previne o envio do formulario para o servidor (back-end)
    event.preventDefault();
    //obtem o valor do campo de busca de letras minusculas (.tolowerCase())
    const query = searchInput.ariaValueMax.toLowerCase().trim();
    
    //para cada item de catalago(quatro items)
    items.forEach(item => {
        //obtem o nome de catagoria  do item atual em letras minusculas 
        const title =item.querySelector('card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();
        
        //verificar se o titulo ou categoria do item atual incluem o valor digitado no campo de busca
        //se o valor do campo de busca (query==="") for em branco,exibe todos os itens
        if(title.includes(query) || category.includes(query) || query === "") {
        } else {
            item.style.display = 'none'; //esconde o item
            
        }
    });
    
}

//adicionar evento ao cliclar no botão "buscar"
searchButton.addEventListener('click', executarPesquisa);
//adicionar evento ao pressionar qualquer tecla no campo "buscar item"
searchInput.addEventListener('keyup', (event) => {
    //permite buscar ao pressionar enter
    if(event.key === 'Enter') {
        executarPesquisa(event);
    }else if(searchInput.value.trim() == ""){
        //mostra todos os itens se a busca for apagada
        executarPesquisa(event);
    }
});

// 3.atualiza os itens do catalogo ao carrregar o HTML da pagina
// para cada cartao  da  pagina 
items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];
    
    // o 'index' comeca apartir do '0' (zero)
    //enquanto o catalogo de itens (CATALOGO_ITEMS) comeca aprtir de '1' (um)
    //por tanto,somamos '1' (um) ao 'index' para que a numeracao do indice corresponda 
    // a numeracao do catalogo do itens
    const item =CATALOGO_ITEMS.find(i => i.id == (index + 1));
    
    if (item){
        //atualiza o texto da imagem do cartao com  a categoria do item 
        img.src = img.src.replace(/\?text=(.*)/,"?text="+ item.categoria.toUpperCase());
        // atualiza o texto do titulo do cartao
        title.textContent = item.titulo;
        //atualiza a categoria do item
        category.textContent = "categoria:" + item.categoria;
        //atualiza a descrinçao do item 
        description.textContent = item.detalhes;
    }
    
});

// 4. adiciona funcionalidadec de kookie (ércitencia) dos itens adicionados ao carrinho 
// (mantem os produtos adicioanados ao carrinho mesmo se fechar ou atulizar a pagina )
const CART_STORAGE_KEY = 'shooping_cart';

function obterCarrinhoDoNavegador(){
    //tenta ler kookies do navegador
    try {
        const cookies = localStorage.getItem(CART_STORAGE_KEY);
        if (cookies){
            //se os kookie xistir,retorna o kookie
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("falha ao ler o kookie do armanezamento local.")
    }
    // retorna um vetor vazio em caso de falha 
    return [];
}

function salvarCookieCarrinho(itensCarrinho){
    try {
        //salvar os itens do carrinho em formato JSON no navegador 
        //ex: ao adicionar o item com ID '2 e 3' ao contrario, CART_STORAGE_KEY = {2,3}
        //voce pode vizualizar os itens salvos no navegador em:
        //botao direito na pagina >inspencionar  >aplication  >storage > local storage 
        localStorage.setItem(CART_STORAGE_KEY,JSON.stringify(itensCarrinho));
    }catch (e){
        console.error("falha ao salvar carrinho no navegador.erro:", e);
    }
}

function atualizarContadorCarrinho(){
    //obtem os itens existentes no carrinho 
    const carrinho = obterCarrinhoDoNavegador();
    //obetem  o elemento HTML que exibi o numero de itens no carrinho  (bedge)
    const carrinhoBadge = document.getElementById("cart-count");
    
    // se o elemento que exibe  o nuemro de itens no carrinho (bedge) existe 
    if (carrinhoBadge){
        //atualiza a badge  do carrinho com o numero de itens do carrinho 
        carrinhoBadge.textContent = carrinho.length;
        
        if(carrinho.length > 0){
            //remove o class bootstrap 'd-none' (ccs: 'display: none;') para rexibir  o bedge
            carrinhoBadge.classList.remove('d-none');
        }else{
            //adiciona a class bootstrap 'd-none' ( CCS: 'display:none;') para ocultar o bedge
            carrinhoBadge.classList.add("d-none");
        }
    }
}

function adicionarItemCarrinho(itemId) {
    //obtem os itens atuais do carrinho
    const carrinho = obterCarrinhoDoNavegador();
    carrinho.push(itemId) //adicionar o ID do item recebido com parametro da funcao ao carrinho 
    salvarCookieCarrinho(carrinho); //atualiza o kookie do carrinho 
    atualizarContadorCarrinho (); //atualiza o numero de item do HTML do carrinho do nvbar
}
// carrega o numero de itens no  carrinho  ao carregar a pagina HTML 
atualizarContadorCarrinho();

// 5. renderiza  o conteudo do carrinho 
const carrinho_btn = document.getElementById("cart-button");

//ao clicar no botao do carrinho
carrinho_btn.addEventListener("click",function() {
    //Exibe a secao de "meu carrinho de compras" se ela estiver invisivel(remove a class "d-none")
    //oculta a seçao do "meu carrinho de compras" se ela nao estiver visivel (adiciona a classe "d-none") 
    const carrinho_secao = document.getElementById("cart-section");
    carrinho_secao.classList.toggle("d-none");
    
    // se a seçao do carrinho passui a class "d-none" (ou seja, se o carrinho nao esta visivel)
    if(carrinho_secao.classList.contains("d-none")){
        return;//para de processar a funçao de renderizar o recibo se a seçao "meu carrinho de compras" nao esta visivel 
    }
    
    const itensCarrinho_recibo = document.getElementById("cart-list");
    Carrinho_recibo.innerHTML = "";//limpa a lista de itens e recibo atual
    
    const itensCarrinho = obterCarrinhoDoNavegador();//le os kookies do navegador 
    //para cada itens do carrinho 
    itensCarrinho.forEach(itemCarrinho => {
        //adiciona o item do carrinho ao recebido
        const li = document.createElement("li");
        
        carrinho_recibo.appendChild(li);
    });
});
