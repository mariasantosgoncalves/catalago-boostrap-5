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
        categoria: "artesanatos",
        detalhes: "o casamento de anna e kristoff e a chegada de um novo menbro na familia real.",
        preco: "R$ 49,00",
        estoque: "150",
        autor: "jennifer lea",
        cumprimento:"50cm"
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
        categoria: "artesanatos",
        detalhes: " narra as ultimas 12 horas de vida de jesus com foco em sua agonia,flagelaçao e crusificaçao de maneira visceral e realista! ",
        preco: "R$ 49,00",
        estoque: "15",
        autor: "benedict fitzgerald e mel gibson",
        cumprimento:"50cm"
    }
]; 

/**
* adiciona listeners aos botoes "ver detalhes" para popular o modal dinamicamente 
*/
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('modal-title');
const modalBoy = modalElement.querySelector('modal-boy');

//1.ouvinte para popular o modal ANTES  de ser exibido
modalElement.addEventListener('show.bs.modal', function (event){
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttibute('data-item-id'));
    //procura pelo ID do item clickando no vetor "CATALOG_ITEMS"
    const item = CATALOGO_ITEMS.find(i=> i.d === itemId);
    
    //se o item foi encontrado no vetor "CATALOG_ITEMS"
    if(item) {
        //atualiza o titulo da modal
        modalTitle.textContent = item.titulo;
        
        //criar HTML de detalhes 
        let detailsHTML = `
        <p class="mb-1"><strong>categorias:</strong> <span class= "badge bg-secondary"
        <p class= "fs4 fw-bold text-success mb-3>preco: ${item.preco}<p/>
        <hr>
        <p>${item.detalhes}</p>
        `;
    }
});