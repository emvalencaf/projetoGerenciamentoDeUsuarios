# Gerenciamento de Usuários


O projeto está sendo desenvolvido durante o curso de [Javascript Completo 6 projetos da code na Udemy](https://www.udemy.com/course/javascript-curso-completo/) que pode ser encontrado em seu formato original no [repoistório da Hcode](https://github.com/hcodebr/curso-javascript-projeto-usuarios).

O projeto convidou a uma reflexão e exercício dos princípios da programação orientada oa objeto (POO), do design pattern Model-Controller-View (MVC). Assim como, ofereceu a oportunidade de revisar assuntos sempre presentes como a manipulação do DOM, iteração de array, objetos e usos de API's nativas da linguagem javascript.

## Desafios

Nesse projeto foram usadas as propriedades privadas (private field) o que tornou o projeto mais complexos em relação ao ensinado durante as aulas.

Isto porque tornou-se mais díficil fazer as conversões dos objetos instanciados pela classe UserModel (uma vez que seus campos são privados e não-listados em iterações de array) para JSON.

Para solucionar essa dificuldade foi necessário desenvolver um método que listasse os getters e setters das propriedades privadas para a conversão pos objetos em JSON.


## Integração front-end e back-end

### Breve notas quanto ao back-end

Além do desenvolvimento do front-end foi desenvolvido - em aparatado ao projeto e usando o NodeJS e o framework Express - uma restful API para o gerenciamento do cadastro usando o [pacote NEDB](https://www.npmjs.com/package/nedb) a qual, a versão que eu desenvolvi, se encontra [neste repositório](https://github.com/emvalencaf/restfulAPIGerenciamentoDeUsuario).

Por ser uma API simples em que há apenas as rotas DELETE, GET (geral e pelo id), PUT e POST, e os registros da API ficam na máquina do servidor da aplicação.

### Notas sobre a integração

Para a integração entre o front-end e o back-end foi criado dois servidores:

- O primeiro para a restful API em que também se encontra o banco de dados;
- O segundo para o front-end que fará requisições assíncronas ao servidor da API;

A construção do client-server foi desenvolvido usando o pacote express-generator.

### Como usar

Para usar é preciso rodar tanto o servidor da API quanto o servidor do front-end baixando os pacotes em dependências (usando o comando npm install) e em seguida rodar o servidor usando o comando npm start no terminal dos repositórios da API e do front-end