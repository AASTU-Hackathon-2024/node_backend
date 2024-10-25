# API-Documentation
## Overview
This API provides endpoints for managing users, products, orders, in the e-commerce application.
### Authentication 
**Important:** There is currently no authentication for any services although we will consider jwt later.
### Base_URL
https://localhost:8000
### Users
- GET /user/list
  - fetches all user data including relational datas such as cart wishilist
  - returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
      - ```json
{
  "id": 1,
  "userId":"hijaka32",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "10Q#1212jkl21h3jk2;jk3h2;1jk3hjk12b;3jk;21h3jk2b ;kej;b1k2h3j2kb3nk12 kj" //bcrypted
  "createdAt": "2023-10-01T12:34:56Z",
  "updatedAt": "2023-10-10T12:34:56Z",
  "carts":[],
  "wishlists":[]
  ...
}
  
  


