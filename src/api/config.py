from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    """
    Configuration class to manage environment variables.
    """
    POSTGRESDB_DBNAME = os.getenv("POSTGRESDB_DBNAME")
    POSTGRESDB_USER = os.getenv("POSTGRESDB_USER")
    POSTGRESDB_PASSWORD = os.getenv("POSTGRESDB_PASSWORD")
    POSTGRESDB_HOST = os.getenv("POSTGRESDB_HOST")
    POSTGRESDB_PORT = os.getenv("POSTGRESDB_PORT")

