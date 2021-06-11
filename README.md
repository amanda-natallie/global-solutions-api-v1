<p align="center"><a href="https://garage-car-companion.vercel.app/" target="_blank"><img src="http://i.prntscr.com/pLcjfwO9ST_Ut90N3_WJHg.png" width="400"></a></p>


## Garage Car Companion 
Este projeto contem o consumo de API de Carros e Lava-Rápidos em React.JS e a API em Laravel. 
 Os Models estão dentro de ```backend/app/Models``` e os controllers em ```backend/app/Http/Controllers/API```. 
As views estão sendo consumidas via REST no projeto contido na pasta ```frontend``` deste repositório.
A API está sendo consumida no frontend via axios HTTP requests para realizar o CRUD de Carros e Lava-Rápidos dentro da pasta ```frontend``` utilizando a lib React.JS do javascript.

### Pré-requisitos: 
- NodeJS instalado na máquina
- Xampp instalado na máquina, rodando Mysql e Apache
- Insomnia para testar as rotas

### Como rodar o projeto?
 ###### --- IMPORTANTE! você precisa rodar o backend antes do frontend.
 
 1. Acesse seu banco de dados local e crie um banco chamado ```laravel```    
 2. Clone este projeto e entre na pasta ```backend``` contendo os arquivos
 3. Abra um terminal/cmd na pasta ```backend``` e rode o comando ```php artisan migrate``` (Isto irá criar as tabelas no banco de dados).
 4. Instale e execute o Insomnia. 
 5. Navegue até a pasta ```backend/doc/Insomnia_2021-06-11.json ``` e importe o arquivo JSON dentro do Insomnia clicando aqui: 

![JSON no Insomnia](http://i.prntscr.com/q7JVy44NReaeDvtFBXBIaQ.png "Como importar JSON no Insomnia")

7. E depois aqui:

![JSON no Insomnia](http://i.prntscr.com/MWiNgvGpTA2-MRL-GmNgEg.png "Como importar JSON no Insomnia")


8. Com isto você será capaz de testar as rotas contidas no backend.

Para ver a API em ação, acesse a pasta frontend e siga o passo a passo a seguir.
 1. Acesse a pasta frontend depois de clonar o projeto
 2. Abra um terminal/cmd na pasta e rode o comando ```yarn && yarn start```
 3. Com isto você será capaz de testar o consumo da API do projeto.
   
