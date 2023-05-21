# Purpose
- Script in this directory handle the authentication backend and user questions

## to start script in development
- ```npm run start```
- script runs on port 4000, eg To create a new user make  a post request with email and password in body to ```http://localhost:4000/register```

## Authentication endpoints
- /login POST (body of request requires email and password)
- /register POST (body of request requires email and password)
- /resetpassword POST (body of request requires email)
- /authstate GET (get user data like photoUrl, displayName, email etc)
- /logout GET (logout user)
- /change_pic POST (body of request requires photoUrl, also returns current photoUrl)

## Question endpoints
- /my_questions GET (get questions created by user)
- /create_quiz POST (requires question body, check quiz.json for mandatory fields, also returns question_id in the return body, use this as the id for update/delete operations)
- /delete_quiz/:question_id DELETE (deletes quiz from collection)
- /update_quiz/:question_id POST (updates quiz, requires question body, check quiz.json for mandatory fields. pls update everything at once)

