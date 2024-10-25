# API-Documentation
## Overview
This API provides endpoints for managing users, products, orders, in the e-commerce application.
### Authentication 
>[!IMPORTANT]
>There is currently no authentication for this service so there is no need for Authorization although we will consider jwt for later.
### Base_URL
https://localhost:8000
### Users
- GET /user/list
  - fetches all user data including relational datas such as cart wishilist
  - returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
        "id":1,
        "userId":"hij21k31",
        "name":"@yonna",
        "email":"yonas@example.com",
        //...
        "carts":[],
        "wishlists":[]
        }
  
  


