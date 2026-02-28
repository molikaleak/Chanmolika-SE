#!/usr/bin/env python3
"""Script to create database tables."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.services.database_service import create_tables
from app.core.db_models import JDAnalysis  # Ensure model is registered

if __name__ == "__main__":
    print("Creating database tables...")
    create_tables()
    print("Tables created successfully.")