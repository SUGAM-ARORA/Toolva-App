# Create database
psql -U postgres -c "CREATE DATABASE toolva;"

# Run migrations
psql -U postgres -d toolva -f ../migrations/001_create_tools_and_categories.sql 