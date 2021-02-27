yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:run
yarn typeorm migration:revert

yarn typeorm migration:create -n CreateSurveys
yarn typeorm migration:run

yarn add jest @types/jest -D
yarn jest --init
yarn add ts-jest -D

npm i --save-dev @types/jest