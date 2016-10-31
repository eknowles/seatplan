# seatplan

A little app to make classrooms or offices more user friendly where everyone can pick a seat they want.

## Tech stack

- Node.js
- MongoDB
- Jade
- AngularJS

## Environment

```
DOMAIN=example.com
COOKIE_TOKEN=XXX
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_PASS=youemailpassword
SMTP_USER=you@example.com
```

## Seed Database

You can seed the users db with `./seed/users.json`. For example.

```json
[
  { "firstName": "Jack", "lastName": "Bower", "email": "j.bower@example.com", "admin": true},
  { "firstName": "Alice", "lastName": "Smith", "email": "a.smith@example.com"},
]
```
