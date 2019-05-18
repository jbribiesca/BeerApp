-- Insert queries to populate the beers table
INSERT INTO beers (beer_name, abv, beer_type, brewery_name, drank_beer)

-- Entries inserted into the table with beer names, abv % as decimals, beer type, brewery name and a drank boolean at the end.
VALUES ("Medalla Light", 4.2, "Light Lager", "Cervecera de Puerto Rico", FALSE),
  ("Heineken Light", 3.2, "Premium Lager", "Heineken", FALSE),
  ("Blood & Honey", 7.0, "Honey Beer", "Revolver", TRUE),
  ("Belgium White", 5.4, "Witbier", "Blue Moon", TRUE);

