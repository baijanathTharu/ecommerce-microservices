# Ecommerce Shop Microservice

An example project to learn about microservices

### TODO:

- [x] Add authentication
  - [x] Authenticate the `create order` api
  - [x] Authenticate the `order_created` event
- [x] Create api in `billing` service to complete the payment
- [x] Create a service to make delivery
  - [x] The delivery service listens for `payment_made` event and then sends a notification to the customer.
  - [x] Order service will also listen for `payment_made` event and it will update the order_status of the order to `delivered` when it occurs.
- [ ] Implement `api gateway` to make the services available to the public

## Architecture

![Architecture diagram](https://github.com/baijanathTharu/ecommerce-microservices/blob/main/architecture.png?raw=true)

## Setup the project

- Clone the repo

  ```sh
  git clone https://github.com/baijanathTharu/ecommerce-microservices.git
  ```

- Install the dependencies

  ```sh
  npm install
  ```

- Start the `mysql` database and the `rabbitmq` message broker

  ```
  docker-compose up -d -V
  ```

- Run the migrations for the database

  - Migration for `auth-model`

    ```sh
    npx prisma migrate --schema libs/prisma-clients/auth-model/prisma/schema.prisma
    ```

  - Migration for `orders-model`

    ```sh
    npx prisma migrate --schema libs/prisma-clients/orders-model/prisma/schema.prisma
    ```

  - Migration for `billing-model`

    ```sh
    npx prisma migrate --schema libs/prisma-clients/billing-model/prisma/schema.prisma
    ```

- Run the services
  - Run the `orders` service
    ```sh
    nx run orders:serve
    ```
  - Run the `billing` service
    ```sh
    nx run billing:serve
    ```
  - Run the `delivery` service
    ```sh
    nx run delivery:serve
    ```
  - Run the `auth` service
    ```sh
    nx run auth:serve
    ```

## How does this work?

- Create order at first in `order` service.
- Order service emits an event `order_created` to the `billing` service.
- Billing service creates a bill for the order.
- Make a payment in `billing` service and then emit an event `payment_made` to the `delivery` service and `order` service.
- Delivery service sends a notification to the customer.
- Order service updates the order status to `delivered`.

## Postman Documentation of api's

[Documentation](https://documenter.getpostman.com/view/11936550/UzBqojzt)
