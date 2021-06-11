<p align="center"><a href="https://garage-car-companion.vercel.app/" target="_blank"><img src="http://i.prntscr.com/pLcjfwO9ST_Ut90N3_WJHg.png" width="400"></a></p>


## Garage Car Companion API
Este projeto contem a API de Carros e Lava-Rápidos em Laravel. os Models estão dentro de ```app/Models``` e os controllers em ```app/Http/Controllers/API```. As views estão sendo consumidas via REST no projeto contido na pasta ```frontend``` deste repositório.

### Pré-requisitos: 
- Xampp instalado na máquina, rodando Mysql e Apache
- Insomnia para testar as rotas


### Como rodar o projeto?
1. Acesse seu banco de dados local e crie um banco chamado ```laravel```    
2. Clone este projeto e entre na pasta contendo os arquivos
3. Abra um terminal/cmd na pasta e rode o comando

   ```php artisan migrate```
   (Isto irá criar as tabelas no banco de dados)
4. Instale e execute o Insomnia. 
5. Navegue até a pasta ```doc > Insomnia_2021-06-11.json ``` e importe o arquivo JSON dentro do Insomnia clicando em ![JSON no Insomnia](http://i.prntscr.com/q7JVy44NReaeDvtFBXBIaQ.png "Como importar JSON no Insomnia")
6. E depois aqui: 
![JSON no Insomnia](http://i.prntscr.com/MWiNgvGpTA2-MRL-GmNgEg.png "Como importar JSON no Insomnia")
7. Com isto você será capaz de testar as rotas contidas neste back end
   