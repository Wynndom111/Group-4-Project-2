# Group-4-Project-2
Group 4 Project 2



# Step 1 Clean Data
Download CSV files -> data found in data folder
clean up data within python script
identfy necessary columns

# Step 2: Load Database

### How to create PostgresSQL database

1) create database named 'incarceration_db' & open a query tool 

2) Located in 'sql' folder in Group-4-Project-2 repo, run all schema files to create tables in sql

*NOTE when importing csv's in sql, make sure the 'header' tab is clicked and the delimiter is set to ','

3) In the 'data' folder in repo, import 'prison_data_df.csv' into 'incarceration_data' table in sql

4) In the 'data' folder in repo, import 'state_data_df.csv' into 'state_data' table in sql

5) In the 'data' folder in repo, import 'state_grouped' into 'grouped_data' table in sql


# Step 3: Update password in the pw.py file 

1) In order to run the Flask server and read data from the database created in the previous step you will need to add your password to a pw.py file in the main directory

2) Save that file, and your good to go!


# Step 4: Run Flask Server


