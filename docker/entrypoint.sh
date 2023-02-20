#! /bin/sh

npm run typeorm:create-db
npm run typeorm:run-migrations

# Execute the given or default command:

exec "$@"
