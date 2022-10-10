BEGIN;
DROP TABLE IF EXISTS october_events;
CREATE TABLE october_events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(50),
    event_type VARCHAR(20),
    month_day INTEGER
);
COMMIT;