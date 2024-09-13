USE ucode_web;

CREATE TABLE
  IF NOT EXISTS powers (
    id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    type ENUM ('attack', 'defense') NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS heroes_powers (
    hero_id INT UNSIGNED NOT NULL,
    power_id INT UNSIGNED NOT NULL,
    power_points INT NOT NULL,
    PRIMARY KEY (hero_id, power_id),
    FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers (id) ON DELETE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS races (
    id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name TEXT
  );

ALTER TABLE heroes
ADD COLUMN race_id INT UNSIGNED,
ADD CONSTRAINT fk_race_id FOREIGN KEY (race_id) REFERENCES races (id) ON DELETE SET NULL;

CREATE TABLE
  IF NOT EXISTS teams (
    id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name TEXT
  );

CREATE TABLE
  IF NOT EXISTS heroes_teams (
    hero_id INT UNSIGNED NOT NULL,
    team_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (hero_id, team_id),
    FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE
  );