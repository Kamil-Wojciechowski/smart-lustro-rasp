import sqlite3

import config_handler
import time_handler


def execute_query(query, is_write):
    with sqlite3.connect(config_handler.get_property('database_filename')) as connection:
        cursor = connection.cursor()
        cursor.execute(query)
        if is_write:
            connection.commit()


def initialize_database():
    query = '''CREATE TABLE IF NOT EXISTS sensors_history (
                    name VARCHAR(50) NOT NULL,
                    value REAL NOT NULL,
                    created_at INTEGER NOT NULL);'''
    execute_query(query, True)


def remove_expired_records():
    query = f'''DELETE FROM sensors_history WHERE created_at < {time_handler.get_expired_records_millis()}'''
    execute_query(query, True)


def insert_sensor_record(name, value):
    query = f'''INSERT INTO sensors_history (name, value, created_at) 
                    VALUES ("{name}", {value}, {time_handler.get_current_millis()});'''
    execute_query(query, True)
