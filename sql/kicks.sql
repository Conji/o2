CREATE TABLE Kicks (
    SteamID TINYTEXT NOT NULL,
    KickedByID TINYTEXT NOT NULL,
    Reason TINYTEXT NOT NULL,
    EnforcedOn INT NOT NULL
)