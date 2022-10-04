## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## DEPOSIT ROUTE
request
```bash
curl -X POST http://localhost:3000/transactions/deposit -H "Content-Type: application/json" -d '{"value":"123", "to": "632584553d6033d22a544822"}'

```

response
```json
{
  "_id": "633c565873dbe8b25c6a0b0f",
  "value": 1,
  "to_userId": "632584553d6033d22a544822",
  "type": "deposit",
  "createdAt": "2022-10-04T15:50:48.852Z"
}
```

## WITHDRAW ROUTE
request
```bash
curl -X POST http://localhost:3000/transactions/withdraw -H "Content-Type: application/json" -d '{"value":"123", "from": "632584553d6033d22a544822"}'

```

response
```json
{
  "_id": "633c569c73dbe8b25c6a0b14",
  "value": 1,
  "from_userId": "632584553d6033d22a544822",
  "type": "withdraw",
  "createdAt": "2022-10-04T15:51:56.639Z"
}
```

## TRANSFER ROUTE
request
```bash
curl -X POST http://localhost:3000/transactions/withdraw -H "Content-Type: application/json" -d '{"value":"123", "from": "632584553d6033d22a544822", to: "632584553d6033d22a544821", from: "632584553d6033d22a544822"}'
```

response
```json
{
  "_id": "633c57e073dbe8b25c6a0b22",
  "value": 1,
  "from_userId": "632584553d6033d22a544822",
  "to_userId": "632584553d6033d22a544821",
  "type": "transfer",
  "createdAt": "2022-10-04T15:57:20.226Z"
}
```


## GET BALANCE ROUTE
request
```bash
curl -X GET http://localhost:3000/user/balance/632584553d6033d22a544822 -H "Content-Type: application/json"
```

response
```json
{
  "_id": "632584553d6033d22a544822",
  "balance": 179,
  "createdAt": "2022-10-04T13:20:45.867Z"
}
```

