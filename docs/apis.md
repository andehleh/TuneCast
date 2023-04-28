### APIs

### Weather

- Method: GET
- Path: /api/open*weather_api/{city}/{state}/, /api/open_weather_api/{lon}*{lat}/

Input:

{
"city": string,
"state": string
}

Output:

{
"name": string,
"weather": string
}

### State

- Method: GET, POST, DELETE
- Path: /api/state/, /api/state/{id}

Input:

{
"abr": string
}

Output:

{
"abr": string,
"id":string
}

### Location

- Method: GET
- Path: /api/location/{lon}\_{lat}/

Input:

{
"lon": number,
"lat": number
}

Output:

{
"city": string,
"principleSubdivisionCode": string
}

### History

- Method: GET, POST, DELETE
- Path: /api/history/, /api/history/{history_id}

Input:

{
"date": string,
"weather": string,
"playlist": string
}

Output:

{
"date": string,
"weather": string,
"playlist": string,
"id": string,
"user_id": string
}

### Accounts

- Method: GET, POST
- Path: /api/accounts/

Input:

{
"username": string,
"password": string
}

Output:

{
"id": string,
"username": string,
}
