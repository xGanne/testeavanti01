# Projeto 01 - Desenvolvimento do Layout - Avanti

## 📝 Objetivo

O desafio consistiu em desenvolver um layout proposto a partir do [Figma](https://www.figma.com/proto/DqtFxC6312M32mLt8FpJjq/innovation-class?page-id=13%3A673&node-id=13-920&viewport=346%2C140%2C0.11&t=HyGGDSs83f1vbqMJ-1&scaling=scale-down&content-scaling=fixed) utilizando HTML, CSS e JavaScript, focando na estrutura, estilização responsiva e interatividade básica.

## ✅ Requisitos do Desafio e Funcionalidades Implementadas

O projeto atende aos seguintes requisitos definidos no enunciado:

1.  **Estrutura HTML:** O arquivo `index.html` foi estruturado semanticamente para representar os diferentes componentes do layout, como cabeçalho, banner superior, navegação, seções de conteúdo, carrosséis, rodapé, etc.
2.  **Estilização CSS Responsiva:**
    *   O arquivo `styles.css` contém as regras de estilo para todos os elementos do layout.
    *   **Responsividade:** Foram utilizadas Media Queries (`@media`) para adaptar o layout para diferentes tamanhos de tela, garantindo uma boa experiência tanto em Desktop quanto em Mobile (conforme visualizado no código CSS para breakpoints como `992px` e `768px`).
    *   **Framework CSS:** Nenhum framework CSS externo (como Bootstrap ou Bulma) foi utilizado. A estilização é totalmente customizada.
    *   **Técnicas CSS:** Foram empregadas técnicas modernas como Flexbox e Grid Layout para organizar os elementos. `position: sticky` foi usado para o banner superior e o cabeçalho.
3.  **Funcionalidade de Busca (JavaScript):**
    *   No campo de busca (`#search-input`) localizado no cabeçalho, ao digitar um termo e clicar no botão da lupa (ou submeter o formulário):
        *   O JavaScript (`script.js`) captura o termo buscado.
        *   A mensagem `"Você buscou por: '[termo buscado]'"` é exibida dinamicamente no elemento `#search-result-display`, posicionado logo abaixo da barra de busca.
        *   A exibição dos resultados é controlada (mostrada/escondida) via JavaScript, enquanto o posicionamento é definido pelo CSS.
4.  **Interação dos Carrosséis (JavaScript):**
    *   Os carrosséis de produtos (`.product-carousel-section`) foram implementados utilizando a biblioteca **SwiperJS**.
    *   O JavaScript (`script.js`) inicializa os carrosséis, configurando opções como loop, quantidade de slides visíveis (`slidesPerView`), espaçamento (`spaceBetween`), navegação (setas) e paginação (bolinhas).
    *   Os carrosséis são responsivos, ajustando o número de slides visíveis com base no tamanho da tela (configuração `breakpoints` no Swiper).

## ✨ Outras Funcionalidades Implementadas

Além dos requisitos principais, o código inclui:

*   **Banner Superior Fixo:** Barra informativa no topo da página que permanece visível durante a rolagem.
*   **Cabeçalho Fixo:** O cabeçalho principal também permanece fixo abaixo do banner superior.
*   **Menu de Navegação:** Inclui menus dropdown simples e um Mega Menu para "Todas as Categorias".
*   **Menu Mobile:** Um botão "hamburger" aparece em telas menores para abrir/fechar a navegação principal.
*   **Componentes de Página:** Seções de Herói, conteúdo variado, banner de contato, formulário de newsletter e rodapé completo com informações e links.

## 💻 Tecnologias Utilizadas

*   **HTML5:** Estruturação semântica do conteúdo.
*   **CSS3:**
    *   Estilização customizada.
    *   Flexbox & Grid Layout.
    *   `position: sticky`.
    *   Media Queries (Design Responsivo).
    *   Variáveis CSS (não explicitamente vistas, mas poderiam ser usadas).
*   **JavaScript (ES6+):**
    *   Manipulação do DOM (exibir/ocultar elementos, adicionar conteúdo).
    *   Manipulação de Eventos (`click`, `submit`, `input`).
*   **SwiperJS:** Biblioteca JavaScript para criação de carrosséis touch-slider.
*   **Font Awesome:** Biblioteca de ícones.
*   **Google Fonts:** Para carregamento das fontes customizadas (Nunito Sans, Nunito).

## 🚀 Como Executar

1.  Certifique-se de ter todos os arquivos (`index.html`, `styles.css`, `script.js`) e a pasta `images` (com todos os recursos visuais referenciados) no mesmo diretório.
2.  Abra o arquivo `index.html` em um navegador web moderno (como Chrome, Firefox, Edge).

Não há necessidade de instalação de dependências ou servidor local complexo, pois é um projeto front-end estático que utiliza CDNs para bibliotecas externas (Font Awesome, SwiperJS).

## ℹ️ Observações

*   O projeto demonstra um bom entendimento de HTML, CSS e JavaScript para construção de layouts web responsivos e interativos.
*   A organização do CSS e do JavaScript parece clara e funcional para os requisitos apresentados.
*   O código JavaScript inclui tratamento para esconder a mensagem de busca ao clicar fora da área de busca ou limpar o campo, melhorando a usabilidade.