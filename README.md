# Taller Challange

# Postgress locally

```bash
docker pull postgres
```

*Run postgress*

```bash
    docker run --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -v $(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql postgres
```

# Run service

```bash
uv run fastapi dev src/api
```