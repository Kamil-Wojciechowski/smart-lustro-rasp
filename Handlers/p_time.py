import time

from Handlers import config


def get_current_millis():
    return round(time.time() * 1000)


def get_expired_records_millis():
    return get_current_millis() - (int(config.get_property('days_to_keep_history')) * 24 * 60 * 60 * 1000)
