USE ucode_web;

INSERT INTO
  powers (name, type)
VALUES
  ('Bloody Fist', 'attack'),
  ('Force Field', 'defense'),
  ('Bombard Mode', 'attack'),
  ('Enchanted Armor', 'defense'),
  ('Telepathic', 'attack'),
  ('Array of Weapons', 'attack'),
  ('Iron Shield', 'defense'),
  ('Observe different Timelines', 'defense'),
  ('Armor Controll', 'defense'),
  ('Telekinesis', 'attack'),
  ('Healing Light', 'defense');

INSERT INTO
  races (name)
VALUES
  ('Human'),
  ('Kree'),
  ('Asgardian'),
  ('AI'),
  ('Mutant');

INSERT INTO
  teams (name)
VALUES
  ('Avengers'),
  ('Hydra'),
  ('X-Men'),
  ('Guardians of the Galaxy');

UPDATE heroes
SET
  race_id = 1
WHERE
  name IN (
    'Black Panther',
    'Star-Lord',
    'Iron Man',
    'Captain America',
    'Nick Fury'
  );

UPDATE heroes
SET
  race_id = 5
WHERE
  name IN ('Rocket Raccoon', 'Kurse');

UPDATE heroes
SET
  race_id = 3
WHERE
  name IN ('Drax the Destroyer', 'Loki Laufeyson');

UPDATE heroes
SET
  race_id = 4
WHERE
  name = 'J.A.R.V.I.S.';

UPDATE heroes
SET
  race_id = 2
WHERE
  name = 'CAPTAIN MARVEL';

INSERT INTO
  heroes_powers (hero_id, power_id, power_points)
VALUES
  (1, 1, 200),
  (2, 2, 150),
  (3, 3, 200),
  (4, 4, 150),
  (5, 5, 200),
  (6, 6, 200),
  (7, 7, 150),
  (8, 8, 120),
  (9, 9, 100),
  (10, 10, 190),
  (11, 11, 130);

INSERT INTO
  heroes_teams (hero_id, team_id)
VALUES
  (1, 1),
  (2, 4),
  (3, 4),
  (4, 3),
  (5, 4),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),
  (10, 2),
  (11, 1);