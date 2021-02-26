yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:run
yarn typeorm migration:revert

yarn typeorm migration:create -n CreateSurveys
yarn typeorm migration:run