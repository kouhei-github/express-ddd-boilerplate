MIGRATE=node_modules/.bin/db-migrate

# make migrate_create name=create_table_user
migrate_create:
	${MIGRATE} create $(name)

# make migrate_up
migrate_up:
	${MIGRATE} up

migrate_down:
	${MIGRATE} down