`mysql -u root -p`-> Enter pass and connect to db.
`npx sequelize create:db` -> Used to create a DB from the config.json file using ORM
`npx sequelize model:generate` ->Command is used to create models and migration files. It doesnt make the table auto. MIGRATION FILE IS LIKE git add , table will be created when we do git commit on it. It only CREATES the migration file, does not apply it.
`npx sequelize db:migrate` -> applies all pending migrations to database. Now 2 tables will be created,one desired table and another is its meta data table.

If you make changes in models file , it will put constraints on javascript level. If changes are made in migrations file, then it will be done on database level.
For ex: allowNull: false -> inside migrations file will not allow you to put NULL as a value.
allowNull: false ->inside models file , if you put NULL, it will throw error.

`npx sequelize db:migrate:undo` -> Will revert back the changes done.

Table name is plural, model name is singular.
If your team wants to have same table, they simply `git pull`, then `db:create` and then `db:migrate`. This only transfers the table schema and not table data.

Check out sequelize queries . Also can be used to write raw queries using `sequelize.query`

Services folder work with repositories folder to interact with database.

Create AppError class extending the Error class and use it everywhere else to reduce redundancy in code.

Error.captureStackTrace() returns a string that represents the location of that particular error in the call. It gives us a stack that helps us to find the location of that error in the code at which new Error() was Called. this will help us to find the exact error in our code.

If we have multiple frontends like desktop apps, web apps or mobile apps and we didnt put validation on any one of them, then it might send a bad request to the server which will crash it.
So, its always better to keep validation checks at backend if not both, since all the frontends will interact with it.

Raw strings are also not used in production level codes. We should keep a separate json file with key value pairs. Reasons:-

1. On a high scale app, people of different languages use it, so we cant send the same stirng . We need to have a translation service.
2. Reduces redundancy in the code.

For generating data within seeders folder, first we need to make a seeder file using `npx sequelize seed:generate --name add-airplane`.
This will create a basic seed file, which will have 2 functions up() and down().
up()--> used for pushing data
down()--> used for removing data

To apply all seeds mentioned in seed file, use `npx sequelize db:seed:all `

To undo all seeds applied `npx sequelize db:seed:undo:all `

High level design

API Gateway can work a lot of things.

1. Reverse Proxy
2. Authentication layer
3. Rate Limiter

Orchestrator is used for data aggregation logic.
Helpful in high level of separation of concerns.

---

## Implementing Flight Service

We will implement flight service. Before that, we discussed tables.
We will have airport & city table which will store city name, city ID,airport ID, airport name, etc.

The flights table will have (as discussed in first draft) :-

1. Airplane ID
2. Departure Airport ID
3. Arrival Airport ID
4. Departure time
5. Arrival time
6. price
7. total seats
   etc.

When coding delete route, we dont need middlewares to check the requests since there is no route registered w/o any ID. For checking if ID is present or not, we implemented that in CRUD repository itself.

`npx sequelize model:generate --name City --attributes name:String`
` npx sequelize db:migrate`
Added city model and migrations

While adding same value of city name , it must give good error explanation. So console Error object , it gives particular Sequelize error like `SequelizeUniqueConstraintError`.
Similarly, if we send city name as empty , the DB/model layer is competent/robust enough to throw error.But we handled that directly in middleware so as to stop it from transferring `middleware->controller->service->repository`

### Sequelize ORM One to Many & internal functions

1. Implemented Airport model and migrations
2. Added Associations & references between City and Airport table using custom migration (foreign key constraint) at database level & using sequelize at JS level in models (static associate() ).
3. Added one-to-many association and onDelete='CASCADE'. If u have any database related problem, check migrations file properly.

### Flights Models Setup

1. Learned to create foreign key inside table creation only instead of creating new migration file.
2. When creating foreign key inside createTable() instead of addConstraint() , the structure of references gets changed.
   references:{

   model:
   key:
   }

### Implementing Seats & new Service

1. Use include keyword to create JOINS within multiple tables.
2. Created Seat model and migrations
3. Created Enum file to store strings
4. To seed a particular file, use `npx sequelize db:seed --seed 20230531073609-add-seats.js <entire seed file name>`
