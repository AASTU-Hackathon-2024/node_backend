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
http://localhost:8000
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
      - **Code**: 400 / 500 Bad Request / Internal server error 
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
    - **Code**: 400 / 500 Bad Request / Internal server error 
    - **Content**:
      ```json
      {
       "message":"Something went wrong",
       "error":"actual error message"
      }
- POST /user/signin
  - allows user to be verified and registered.
  - Request body
      - **Content**:
          ```json
          {
           "email": "lorem@ipsum.com",
           "password" : 123456789
          }
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "User-signin succesfully."
          "user":  {
              "id": 1,
              "productId": "hij21k31",
              // ...
              "carts": [],
              "wishlists"
          }
        }
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message":"Failed to register user",
         "error":"actual error message"
        }
- DELETE /user/:id or /user/delete?id=id
  - Registers a user on our database
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "User succesfully Deleted."
        }
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message":"Failed to delete user",
         "error":"actual error message"
        }
### Products
- GET /products/list
  - Fetches all product data including relational datas variation.
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
        "id": 1,
        "productId": "hij21k31",
        "title": "dolor",
        "description": "lorem",
        "category":"ipsum"
        "variations": [{},{}],
        }
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message": "Failed to fetch products",
         "error": "actual error message"
        }
- POST /products/upload
  - Uploads  a product to the product model
  - Request body
      - **Content**:
          ```json
          {
            "title": "dolor"
            "decription": "ipsum",
            "category": "lorem",
            "price": 123
            "variations":
              [{
                color,
                sizes,    // array,
                imgUrls, // array,
                stock
            },
              {},
              {}
            ] // Don't forget to stringify this 
        }
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "Product succesfully Created."
          "product":  {
              "id": 1,
              "productId": "hij21k31",
              // ...
              "variations": [],
          }
        }
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message":"Failed to upload product",
         "error":"actual error message"
        }
- DELETE /products/:id or /products/delete?id=id both end points will ensure the deletion
  - Registers a user on our database
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "Product succesfully Deleted."
        }
  - Error Response
    - **Code**: 400 / 500 Bad Request / Internal server error 
    - **Content**:
      ```json
      {
       "message":"Failed to delete product",
       "error":"actual error message"
      }
- POST /product/upload
  - Uploads  a product to the product model
  - Request body
      - **Content**:
          ```json
          {
            "title": "dolor"
            "decription": "ipsum",
            "category": "lorem",
            "price": 123
            "variations":
              [{
                color,
                sizes,    // array,
                imgUrls, // array,
                stock
            },
              {},
              {}
            ] // Don't forget to stringify this 
        }
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "Product succesfully Created."
          "product":  {
              "id": 1,
              "productId": "hij21k31",
              // ...
              "variations": [],
          }
        }
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message":"Failed to upload product",
         "error":"actual error message"
        }  
  


