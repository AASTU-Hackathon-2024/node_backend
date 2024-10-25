# API-Documentation
## Overview
This API provides endpoints for managing users, products, orders, in the e-commerce application.
## Getting Started
Make sure to clone this repo or download the zip file and extract it in your preffered destination. Navigate to the directory: 
#### Installing Dependencies
```bash
npm install
```
#### Start the application 
```bash
npm run server
```
### Authentication 
>[!IMPORTANT]
>There is currently no authentication for this service so there is no need for Authorization although we will consider jwt for later.
### Base_URL
https://localhost:8000
### Users
- GET /user/list
  - Fetches all user data including relational datas such as carts and wishlist.
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
        "id": 1,
        "userId": "hij21k31",
        "name": "@yonna",
        "email": "yonas@example.com",
        // ...
        "carts": [],
        "wishlists": []
        }
      - Error Response
        - **Code**: 400 Bad Request
        - **Content**:
          ```json
          {
           "message": "Something went wrong",
           "error": "actual error message"
          }
  - POST /user/signup
  - Registers a user on our database
  - Request body
    - **Content**:
        ```json
        {
          "role": "user/admin"//Optional
          "email": "exom@example.com",
          "password": "123456"
        }
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "User succesfully registered."
          "user":  {
              "id": 1,
              "userId": "hij21k31",
              "name": "@yonna",
              "email": "yonas@example.com",
              // ...
              "carts": [],
              "wishlists": []
          }
        }
      - Error Response
        - **Code**: 400 Bad Request
        - **Content**:
          ```json
          {
           "message":"Something went wrong",
           "error":"actual error message"
          }
  
  


