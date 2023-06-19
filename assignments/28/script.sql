-- Create Movie table
CREATE TABLE Movie (
  movie_id INT PRIMARY KEY,
  title VARCHAR(255),
  release_date DATE,
  -- Add other columns as needed
);

-- Create Media table
CREATE TABLE Media (
  media_id INT PRIMARY KEY,
  movie_id INT,
  type ENUM('Video', 'Image'),
  url VARCHAR(255),
  -- Add other columns as needed
  FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);

-- Create Genre table
CREATE TABLE Genre (
  genre_id INT PRIMARY KEY,
  name VARCHAR(255),
  -- Add other columns as needed
);

-- Create MovieGenre table
CREATE TABLE MovieGenre (
  movie_id INT,
  genre_id INT,
  -- Add other columns as needed
  FOREIGN KEY (movie_id) REFERENCES Movie(movie_id),
  FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

-- Create Review table
CREATE TABLE Review (
  review_id INT PRIMARY KEY,
  movie_id INT,
  user_id INT,
  rating INT,
  comment TEXT,
  -- Add other columns as needed
  FOREIGN KEY (movie_id) REFERENCES Movie(movie_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create User table
CREATE TABLE User (
  user_id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  -- Add other columns as needed
);

-- Create Artist table
CREATE TABLE Artist (
  artist_id INT PRIMARY KEY,
  name VARCHAR(255),
  -- Add other columns as needed
);

-- Create Skill table
CREATE TABLE Skill (
  skill_id INT PRIMARY KEY,
  name VARCHAR(255),
  -- Add other columns as needed
);

-- Create ArtistSkill table
CREATE TABLE ArtistSkill (
  artist_id INT,
  skill_id INT,
  -- Add other columns as needed
  FOREIGN KEY (artist_id) REFERENCES Artist(artist_id),
  FOREIGN KEY (skill_id) REFERENCES Skill(skill_id)
);

-- Create Role table
CREATE TABLE Role (
  role_id INT PRIMARY KEY,
  name VARCHAR(255),
  -- Add other columns as needed
);

-- Create MovieArtistRole table
CREATE TABLE MovieArtistRole (
  movie_id INT,
  artist_id INT,
  role_id INT,
  -- Add other columns as needed
  FOREIGN KEY (movie_id) REFERENCES Movie(movie_id),
  FOREIGN KEY (artist_id) REFERENCES Artist(artist_id),
  FOREIGN KEY (role_id) REFERENCES Role(role_id)
);
