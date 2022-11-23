import __init__
import sqlite3
import os
from handlers import config, p_time


database_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', config.get_property('database_filename')))


def execute_query(query, is_write):
    with sqlite3.connect(database_path) as connection:
        cursor = connection.cursor()
        cursor.execute(query)
        if is_write:
            connection.commit()


def initialize_database():
    query = '''CREATE TABLE IF NOT EXISTS weather_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    temperature REAL NOT NULL,
                    humidity REAL NOT NULL,
                    created_at INTEGER NOT NULL);'''
    execute_query(query, True)


def remove_expired_records():
    query = f'''DELETE FROM weather_history WHERE created_at < {p_time.get_expired_records_millis()}'''
    execute_query(query, True)


def insert_weather_record(temperature, humidity):
    query = f'''INSERT INTO weather_history (temperature, humidity, created_at)
     VALUES ({temperature}, {humidity}, {p_time.get_current_millis()});'''
    execute_query(query, True)
