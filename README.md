# 🎮 GameTime

Este aplicativo ajuda-o a manter um registo dos jogos que está a jogar, que já terminou ou que planeia jogar. Simples assim.

## O que pode fazer

  * **Login e Registo Seguros**: Crie a sua conta e mantenha a sua lista protegida.
  * **Gerir a sua Lista**: Adicione, veja, atualize e apague jogos facilmente.
  * **Encontrar os seus Jogos**: Pesquise por nome ou filtre por status (Jogado, Jogando, Jogarei).
  * **Ordenar como Quiser**: Organize a sua lista por título ou pela sua nota pessoal.

## Tecnologias Utilizadas

A aplicação é dividida em duas partes principais:

  * **Backend**: Java 21, Spring Boot 3, Spring Security com JWT, Spring Data JPA e MySQL.
  * **Frontend**: Angular 20, TypeScript e Bootstrap.

Para o ambiente de desenvolvimento, utilizei Docker para criar e gerir o contentor do banco de dados e do backend.

## Como Executar o Projeto

A forma mais rápida de colocar tudo a funcionar é com o Docker Compose.

**O que precisa:**

  * Docker e Docker Compose instalados.

**Passos:**

1.  **Clone o projeto** para a sua máquina.

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
    ```

2.  **Inicie o backend e o banco de dados** com um único comando a partir da raiz do projeto:

    ```bash
    docker-compose up --build
    ```

3.  **Inicie o frontend** em outro terminal:

    ```bash
    cd gametime-frontend
    npm install
    ng serve
    ```

4.  **Pronto.** Agora pode aceder à aplicação:

      * **Frontend**: `http://localhost:4200`
      * **API do Backend**: `http://localhost:8081`

## Sobre Este Projeto

Eu criei o GameTime para resolver um problema meu. Uso o TVtime para acompanhar filmes e séries e queria algo parecido para os meus jogos. Como não encontrei uma ferramenta simples que me agradasse, decidi construir a minha.

Este projeto também serviu como uma ótima oportunidade para construir uma aplicação full-stack do zero, aplicando na prática os meus conhecimentos em Java e Angular.