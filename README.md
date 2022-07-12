# Ecommerce Shop Microservice

An example project to learn about microservices

### TODO:

- [ ] Add authentication
  - [ ] Authenticate the `create order` api
  - [ ] Authenticate the `order_created` event
- [ ] Create api in `payment` service to complete the payment
- [ ] Create a service to make delivery
  - [ ] The delivery service listens for `payment_made` event and then sends a notification to the customer.
  - [ ] Order service will also listen for `payment_made` event and it will update the order_status of the order to `delivered` when it occurs.
  - [ ] Product service will also listen form `payment_made` event and it will update the quantity of the product when to occurs.
- [ ] Implement `api gateway` to make the services available to the public

## Architecture

![Architecture diagram](https://user-images.githubusercontent.com/60652366/178525204-60c4daed-a3bb-4fd7-a5c2-24ded230a192.png?raw=true)

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
  - Run the `payment` service
    ```sh
    nx run payment:serve
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
