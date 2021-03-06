# Group-4-Project-2
This project is a comprehensive analysis on the national incarceration data of the United States. Our data source is the Annual Survey of Jails Data Series, the years we used in our analysis are 2008-2018. The data sets are hosted at the National Archive of Criminal Justice Data (https://www.icpsr.umich.edu/web/NACJD/series/7/studiesmain). Our main objective of the project was to find the prison population information for each state in the country and compare the demographics for similarities or differences.


# Step 1: Clean Data
1. Clone this repository to your local machine.
1. Once this repo is cloned, open a git bash (windows) or terminal (mac) on the folder titled "Group-4-Project-2".
1. Once in git bash/terminal, type "source activate NewPythonData" and hit ENTER to start Python. Then type "jupyter notebook" to launch a Jupyter Notebook.
1. Once the Jupyter Notebook launches, navigate to "Data Cleaning.ipynb".
1. Once in "Data Cleaning.ipynb", start running cells starting from the top cell to bottom cell, to run cells hit ENTER & SHIFT simultaniously for each cell.
1. Once all dataframes have run correctly and have displayed our clean final dataframes, you are ready to create PostgresSQL database and import the dataframes "prison_data_df", "state_data_df" & "grouped_state" as CSVs.

# Step 2: Create and Load Data into PostgresSQL Database

### How to create PostgresSQL database

1. Create a new database named "incarceration_db" & open a query tool for this new database.
1. Once query tool is opened, hit the 'load file' tab in ribbon of query tool. 
1. Once you've hit load file, navigate to our "Group-4-Project-2 folder" and double-click. 
1. You will find a folder named "sql", double-click that folder. This will lead you to our schemas, click to select the top schema called "grouped_data_schema.sql" and hit the 'Select' button.
1. Once the selected schema is opened in query tool, hit the "play button" located in the top left of the ribbon. This action will transform the schema into a table.
1. Repeat Step 5 for "incarceration_data_schema.sql" & "state_data_schema.sql" to create the remaining schemas and hit the "play button" to create remaining tables.


### Now that the tables have been created, it's time to load our CSVs into the database
1. Navigate to "schemas" tab in "incarceration_db" and open the "tables" dropdown, you will see our 3 tables.
1. Double-click the first table, you will have a new pop-up, in this pop-up, select "Import/Export..."
1. Hit the top tab to "import", then hit the "..." button on "Filename".
1. Navigate to our "Group-4-Project-2" repo and double click the "data" folder, this folder contains our CSV's we will want to load.
1. In this folder, find the CSV file named "state_grouped_csv", 'select' it, and hit "select".
1. You now have the "state_grouped_csv" selected, to ensure it is loaded properly, hit the 'header' tab to remove header & select 'Delimiter' to set the delimiter to ','.
1. Hit "OK" to populate the table.
1. Repeat steps 1-7 to populate the remaining tables (incarceration_data & state_data).


# Step 3: Configuring the Flask file & defining the database parameters
1. On your desktop, navigate to the repo for "Group-4-Project-2".
1. Drag the folder for the repo and drop it into Visual Studio Code.
1. Once the repo has loaded into VSCode, navigate to app.py.
1. On line 18, your "username" should stay as 'postgres'.
1. On line 19, you will notice that for "password" it will be listed as 'pw', disregard this for now, line 19 will be explained in Step 4.
1. On line 20, define the "database_name" as 'incarceration_db', this is our database we created in Step 2.
1. On line 21, for "connection_string", leave '{password}' as is, but to connect the database, attach '/incarceration_db' to the end of the string.


# Step 4: Configuring password for pw.py
1. Navigate to "pw.py".
1. On line 1 you will see 'pw = '. This is where your password for PostgresSQL will be entered.
1. Enter your password for PostgresSQL, example: 'pw = nineinchnails'.
1. Hit COMMAND 'S' (mac) or CONTROL 'S' (windows) to save your password.


# Step 5: Run Flask Server
1. Once your 'app.py' & 'pw.py' are configured, we can run the flask server for our website.
1. Go to your desktop & navigate to our repo: "Group-4-Project-2"
1. Open up a git bash (windows) or terminal (mac).
1. Type "source activate NewPythonData" and hit ENTER to activate Python.
1. Type "python app.py" and hit ENTER to run the flask server.
1. Once the flask server has launched in your git bash/terminal, navigate to your Chrome browser & open a new search window.
1. Type "127.0.0.1:5000" and hit ENTER. This will be the website for our project, we hope you enjoy it!
