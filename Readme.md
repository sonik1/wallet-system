# Wallet service using Nest.js, Vue.js and MongoDB

Application repo for a simple wallet service built with Nest.js, Vue.js and MongoDB.


### Clone the repository
To easily set up the application, clone this repository which contains directory for both sections of the project ( i.e `wallet-backend` and `wallet-frontend`)

## Change directory into the newly cloned project
```bash
cd wallet-system
```

## Backend
### Change directory into the backend
```bash
cd wallet-backend
```

### Install backend dependencies

```bash
npm install
```

### MongoDB
Ensure that you have mongoDB installed on your machine before running the application. I have this fully setup on my mac already.

Start mongoDB:

```bash
sudo mongod
```

### Run the application
Open another terminal and still within the `wallet-backend` project directory run the application with:

```bash
npm run start:dev
```

This will start the backend application on port `3000`.

## Frontend
Open another terminal from the `



-project` and navigate to the `wallet-frontend` folder to setup the frontend

### Frontend dependencies
```bash
cd wallet-frontend
npm install
```

### Run the frontend app

```bash
npm run serve
```
### API references

wallet setup
localhost:3000/setup

get wallet details
localhost:3000/wallet/:walledId

Post new transaction
localhost:3000/transact

get transactions
localhost:3000/transactions?walletId=xxx&kip=xxx=limit=xxx

Explanation-
The wallet system has the privilege to create a wallet with the user's name and the system will generate a wallet id for the same. After this, it will be redirected to the dashboard where all registered wallets can be seen with the details included.
Additionally, details and transact are the two links included in each card, clicking it will show the details of the wallet, transaction details, and the current balance of the wallet for a particular user. The other link Transact' when clicked will open a component to add a balance with credit/debit privilege. When submitted, the same will reflect in the transaction details.
The database is having two collections, wallet and transactions. Initially, when a new wallet is created, both the collections get the records, as wallet details and transaction details are added with wallet id as foreign key ref.
