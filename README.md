### Tunecast

1. Taylor Wills
2. Andy Lee
3. Jonathan Has
4. Eman Zindani

Tunecast is a weather-based playlist generator.

### Design

1. [API Design] (docs/api documentation)

### Intended Market

This is for anyone who wants to explore new tracks and have a playlist generated just for them based on their location and weather rather than them having to spend time curating it.

### Functionality

1. Users on the website can input their city and state or use the current location option which generates their location for them.
2. Once the location is selected a playlist will be shown depending on the weather at the user's current location.
3. User's are also able to save the playlist to the history page which displays the date, weather and playlist played.

### Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create mongo-data
4. Run docker compose build
5. Run docker compose up
6. Visit http://localhost:3000 in your browser
7. Exit the container's CLI, and enjoy Tune Cast to its fullest!
