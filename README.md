yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:run
yarn typeorm migration:revert

yarn typeorm migration:create -n CreateSurveys
yarn typeorm migration:run

yarn add jest @types/jest -D
yarn jest --init
yarn add ts-jest -D

npm i --save-dev @types/jest
yarn add supertest
set NODE_ENV=test

yarn typeorm migration:create -n CreateSurveysUsers
yarn typeorm migration:run

yarn add nodemailer
npm i --save-dev @types/nodemailer