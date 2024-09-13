SELECT
  h.id,
  h.name,
  SUM(
    CASE
      WHEN p.type = 'attack'
      OR p.type = 'defense' THEN hp.power_points
      ELSE 0
    END
  ) AS total_power
FROM
  heroes h
  JOIN heroes_powers hp ON h.id = hp.hero_id
  JOIN powers p ON hp.power_id = p.id
GROUP BY
  h.id
ORDER BY
  total_power DESC,
  h.id ASC
LIMIT
  1;

SELECT
  h.id,
  h.name,
  SUM(
    CASE
      WHEN p.type = 'defense' THEN hp.power_points
      ELSE 0
    END
  ) AS total_defense
FROM
  heroes h
  JOIN heroes_powers hp ON h.id = hp.hero_id
  JOIN powers p ON hp.power_id = p.id
GROUP BY
  h.id
ORDER BY
  total_defense ASC,
  h.id ASC
LIMIT
  1;

SELECT
  h.name,
  SUM(
    CASE
      WHEN p.type = 'attack'
      OR p.type = 'defense' THEN hp.power_points
      ELSE 0
    END
  ) AS total_power
FROM
  heroes h
  JOIN heroes_teams ht ON h.id = ht.hero_id
  JOIN teams t ON ht.team_id = t.id
  JOIN heroes_powers hp ON h.id = hp.hero_id
  JOIN powers p ON hp.power_id = p.id
WHERE
  t.name = 'Avengers'
  AND h.name <> 'Double Agent'
GROUP BY
  h.id
ORDER BY
  total_power DESC;

SELECT
  t.name AS team_name,
  SUM(
    CASE
      WHEN p.type = 'attack'
      OR p.type = 'defense' THEN hp.power_points
      ELSE 0
    END
  ) AS total_team_power
FROM
  teams t
  JOIN heroes_teams ht ON t.id = ht.team_id
  JOIN heroes h ON ht.hero_id = h.id
  JOIN heroes_powers hp ON h.id = hp.hero_id
  JOIN powers p ON hp.power_id = p.id
WHERE
  t.name IN ('Avengers', 'Hydra')
GROUP BY
  t.id
ORDER BY
  total_team_power ASC;