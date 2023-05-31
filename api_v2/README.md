## making request with appropriate header for logged in user
```
const axios = require('axios');

const token = 'your-bearer-token';

axios.get('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  // Handle response
})
.catch(error => {
  // Handle error
});
```

## typical post request for quiz creation
```
{
    "title": "math",
    "created_by": "wizdoz@hi2.in",
    "time_of_quiz": "2023-05-27T12:00:00.000Z",
    "allotted_time_mins": 30,
    "questions": [
        {
            "id": "1",
            "options": {
                "A": "america",
                "B": "nigeria",
                "C": "ghana",
                "D": "south africa"
            },
            "answer": [
                "A"
            ],
            "_id": "6471124e4b438a5c1a3e5019"
        },
        {
            "id": "2",
            "options": {
                "A": "option A",
                "B": "option B",
                "C": "option C",
                "D": "option D"
            },
            "answer": [
                "C"
            ],
            "_id": "6471124e4b438a5c1a3e501a"
        }
    ],
    "_id": "6471124e4b438a5c1a3e5018",
}
```
