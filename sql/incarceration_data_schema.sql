CREATE TABLE incarceration_data (
	key VARCHAR(255) PRIMARY KEY,
	year INT,
	state VARCHAR(255),
	county VARCHAR(255),
	facility_name VARCHAR(255),
	confined_population INT,
	adult_male INT,
	pct_adult_male FLOAT,
	adult_female INT,
	pct_adult_female FLOAT,
	juvenile_male INT,
	pct_juvenile_male FLOAT,
	juvenile_female INT,
	pct_juvenile_female FLOAT,
	white_population INT,
	pct_white FLOAT,
	black_population INT,
	pct_black FLOAT,
	hispanic_population INT,
	pct_hispanic FLOAT,
	native_american_population INT,
	pct_native_american FLOAT,
	asian_population INT,
	pct_asian FLOAT,
	native_hawaiian_pacific_islander_population INT,
	pct_native_hawaiian_pacific_islander FLOAT,
	two_or_more_race_population INT,
	pct_two_or_more_race FLOAT,
	other_population INT,
	pct_other FLOAT	
);