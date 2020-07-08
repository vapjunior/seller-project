# Seller Project

This project provides a web solution for manage products and kits with MercadoLivre API for get products categories. This is the front-end repositorie, the back-end with api is: (https://github.com/ValdirJunior/product-kit-api)

## Requirements

### Front-End

- [x] Aplicação constrúida com ReactJS
- [x] Criar, Deletar and Listar Vendedores (Nome e Email)
- [x] Criar, Deletar and Listar Vendas (Valor, Data e Vendedor)
- [x] Comunicar com API Rest para gerenciamento dos dados
- [x] Relacionar Vendedores e suas Vendas

### Back-End

- [x] API construída com PHP/Laravel
- [x] Criar, Alterar, Deletar e Listar Vendedores
- [x] Criar, Deletar e Listar Vendas
- [x] Enviar email ao final de cada dia com um relátorio com a quantidade e soma de todas as vendas

## Build With

- [React](https://pt-br.reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [PHP 7.x](https://www.php.net)
- [Laravel 7.x](https://laravel.com)
- [MySQL](https://www.mysql.com)

## Run
    git clone https://github.com/ValdirJunior/seller-project.git
### Front-End
    cd seller-project/seller-app
    npm install
    npm start

### Back-End
    cd seller-project/seller-api
    composer install
    cp .env.example .env
    php artisan key:generate
    mysql> create database <name_of_your_database>
    #configuar .env com nome do banco de dados, usuário e senha
    php artisan migrate
    php artisan serve

#### SendGrid API

- Este projeto utiliza a API do SendGrid para enviar email, para isso é necessário fazer a devida configuração de usuário e chaves de acesso na plataform [SendGrid](https://sendgrid.com). Após isso adicionar .env as seguintes linhas:

        SENDGRID_API_KEY="SUA_SENDGRID_API_KEY"
        ADMIN_EMAIL="SEU_EMAIL"
        ADMIN_NAME="Seller Project"

- O processo de envio de email está configurar como comando no Scheduler para ser executado todo os dias as 23:59. Para teste pode-se aplicar o comando:

        php artisan schedule:run

## API

### Criar Vendedor

* **URL**
  `/sellers`

* **Method**
  `POST`

*  **Parâmetros via body**


   | Atributo     | Tipo do dado        | Descrição                                    | Obrigatório     | Valor padrão     | Exemplo            |
   |----------    |--------------       |------------------------------------------    |-------------    |--------------    |------------        |
   | name         | alfanumérico        | Nome do Vendedor                             | sim             | -                | José               |
   | email        | alfanumérico,email  | Email do Vendedor                            | sim             | -                | jose@emai.com      |

* **Retorno**
  
  **Status Code:** 201
  
    ```json
    {
        "success": true,
        "data": {
            "id": 4,
            "name": "Valdir",
            "email": "valdir@email.com"
        },
        "message": "Vendedor criado com sucesso"
    }
    ```

### Listar Todos Vendedores

* **URL**
  `/sellers`

* **Method**
  `GET`

* **Retorno**
  
  **Status Code:** 200
  
    ```json
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "name": "Vendedor 1",
                "email": "v1@email.com",
                "commission": "85.00"
            },
            {
                "id": 2,
                "name": "Vendedor 2",
                "email": "v2@email.com",
                "commission": "25.50"
            }
        ],
        "message": "Vendedores recuperados com sucesso"
    }   
    ``` 

### Lançar Nova Venda

* **URL**
  `/sales`

* **Method**
  `POST`

*  **Parâmetros via body**


   | Atributo     | Tipo do dado        | Descrição                                    | Obrigatório     | Valor padrão     | Exemplo            |
   |----------    |--------------       |------------------------------------------    |-------------    |--------------    |------------        |
   | seller_id    | numérico            | ID do Vendedor                               | sim             | -                | 1                  |
   | value        | decimal             | Valor da venda                               | sim             | -                | 100             |

* **Retorno**
  
  **Status Code:** 200
  
    ```json
    {
        "success": true,
        "data": {
            "id": 1,
            "name": "Vendedor 1",
            "email": "v1@email.com",
            "commission": 8.5,
            "value": "100",
            "date": "2020-07-08"
        },
        "message": "Venda lançada com sucesso"
    }  
    ``` 

### Listar Vendas de um Vendedor

* **URL**
  `/sales/{id}`

* **Method**
  `GET`

*  **Parâmetros via url**

   | Atributo     | Tipo do dado        | Descrição                                    | Obrigatório     | Valor padrão     | Exemplo            |
   |----------    |--------------       |------------------------------------------    |-------------    |--------------    |------------        |
   | seller_id    | numérico            | ID do Vendedor                               | sim             | -                | 1                  |

* **Retorno**
  
  **Status Code:** 200
  
    ```json
    {
    "success": true,
        "data": [
            {
                "id": 3,
                "name": "Vendedor 2",
                "email": "v2@email.com",
                "commission": 8.5,
                "value": "100.00",
                "date": "2020-07-08"
            },
            {
                "id": 4,
                "name": "Vendedor 2",
                "email": "v2@email.com",
                "commission": 17,
                "value": "200.00",
                "date": "2020-07-08"
            }
        ],
        "message": "Vendas recuperadas com sucesso"
    } 
    ``` 