

# Postgress locally

```bash
docker pull postgres
```

Run postgress

```bash
    docker run -d --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=your_secure_password postgres
```