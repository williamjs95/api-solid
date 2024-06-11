>> create package.json
npm init -y

>> install typescript and node
npm i typescript @types/node tsx tsup -D

>> create tsconfig.json
npx tsc --init

>> install fastify
npm i fastify

>> install .dotenv ("Environment variables)
npm i dotenv

>> intall zod for validation ("Environment variables)
npm i zod

>> install ESLint with RocketSeat configuration package
npm i eslint @rocketseat/eslint-config -D

>> install Prisma (Object Relational Mapper)
npm i prisma -D

>> run Prisma
npx prisma init

>> generates Prisma schema types
npx prisma generate

>> install prisma instance
npm i @prisma/client

>> create postgre docker image
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql 

>> show running containers
docker ps

>> show all created containers
docker ps -a

>> run docker container
docker start api-solid-pg

>> stop docker container
docker stop api-solid-pg

>> show cotainer logs
docker logs api-solid-pg -f

>> delete docker container
docker rm api-solid-pg

>> migrate schema.prisma to databese
npx prisma migrate dev

>> open Prisma database interface
npx prisma studio

>> run docker container (docker compose)
docker compose up -d

>> stop docker container (docker compose)
docker compose stop

>> delete docker container (docker compose)
docker compose down

>> to make passwords hash
npm i bcryptjs

>> install typescript for bcryptjs
npm i -D @types/bcryptjs

>> intall vitest for unit tests, and vite-tsconfig so vitest understand the paths of the application
npm i vitest vite-tsconfig-paths -D