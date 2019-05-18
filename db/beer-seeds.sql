-- Insert queries to populate the beers table
INSERT INTO beers (beer_name, abv, ibu, beer_type, brewery_name, drank_beer)

-- Entries inserted into the table with beer names, abv % as decimals, beer type, brewery name and a drank boolean at the end.
VALUES ("Medalla Light", 4.2, 0, "Light Lager", "Cervecera de Puerto Rico", FALSE),
  ("Heineken Light", 3.2, 12,  "Premium Lager", "Heineken", FALSE),
  ("Blood & Honey", 7.0, 20, "Honey Beer", "Revolver", TRUE),
  ("Belgian White", 5.4, 9, "Witbier", "Blue Moon", TRUE);

