from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import dotenv_values
from pathlib import Path
import os
config=dotenv_values(Path(__file__).parent[1].resolve()/".env")
engine=create_engine(config["DATABASE_URL"], echo=True)