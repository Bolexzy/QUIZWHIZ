# Purpose
- Script in this directory handle the authentication backend and user questions

## to start script in development
- npm run start
- script runs on port 4000

## Authentication endpoints
- /login POST (body of request requires email and password)
- /register POST (body of request requires email and password)
- /resetpassword POST (body of request requires email)
- /authstate GET
- /logout GET
