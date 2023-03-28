steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE weather (
            id SERIAL PRIMARY KEY NOT NULL,
            picture_url VARCHAR(1000) NOT NULL,
            name VARCHAR(100) NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE weather;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE history (
            id SERIAL PRIMARY KEY NOT NULL,
            date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            weather SMALLINT NOT NULL, (maybe use id?)
            playlist VARCHAR(1000) NOT NULL, (url maybe?)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE history;
        """
    ]
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) UNIQUE NOT NULL,
            hashed_password VARCHAR(200) NOT NULL,
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ]
]
