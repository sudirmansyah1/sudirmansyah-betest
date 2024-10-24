
# Company Test - Node.js Developer
This project serves as a developer test for Node.js proficiency. It includes a simple RESTful API for managing users.


## Run Locally

Clone the project

```bash
  git clone https://github.com/sudirmansyah1/sudirmansyah-betest.git
```

Go to the project directory

```bash
  cd sudirmansyah-betest
```

Install dependencies on each service

```bash
  cd ms-sudirmansyah_producer-betest
  npm install
```
```bash
  cd ms-sudirmansyah_consumer-betest
  npm install
```

Start the server

```bash
  cd ms-sudirmansyah_producer-betest
  npm run prod
```
```bash
  cd ms-sudirmansyah_consumer-betest
  npm run prod
```


## Auth API Reference

#### Get Token

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your Username |
| `password` | `string` | **Required**. Your Password |

Output:
```json
{
    "is_error": false,
    "status": 200,
    "message": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE4ZTM1ZGIzMjQ1NjRlZWY1OTEzOWUiLCJpYXQiOjE3Mjk3MzU1NTIsImV4cCI6MTcyOTczOTE1Mn0.1bCNDOOUnynR1GykjdXwgZRow2KtjbqtLGsVHvfdMhI",
        "expires": "2024-10-24T03:05:52.077Z"
    }
}
