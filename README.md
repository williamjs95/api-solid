# App

GymPass style app.

## Functional Requirements

- [x] It should be possible to register;
- [x] It should be possible to authenticate;
- [ ] It should be possible to retrieve the profile of a logged-in user;
- [ ] It should be possible to retrieve the number of check-ins performed by the logged-in user;
- [ ] It should be possible for the user to retrieve their check-in history;
- [ ] It should be possible for the user to search for nearby gyms;
- [ ] It should be possible for the user to search for gyms by name;
- [ ] It should be possible for the user to check in at a gym;
- [ ] It should be possible to validate a user's check-in;
- [ ] It should be possible to register a gym;


## Business Rules

- [x] The user should not be able to register with a duplicate email;
- [ ] The user cannot perform two check-ins on the same day;
- [ ] The user cannot check in if they are not within 100 meters of the gym;
- [ ] The check-in can only be validated within 20 minutes of being created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;


## Non-Functional Requirements

- [x] The user's password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Tokens);