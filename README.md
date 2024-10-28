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
- GET /user/list
  - Fetches all user data including relational datas such as carts and wishlist.
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        [{
        "id": 1,
        "userId": "hij21k31",
        "name": "@yonna",
        "email": "yonas@example.com",
        // ...
        "carts": [],
        "wishlists": []
        }]
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message": "Failed to fetch users",
         "error": "actual error message"
        }
- GET /user/${id} or /users/fetch?id=${id}
  - Fetches all data of specific user including relational datas such as carts and wishlist.
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
      - throws an error if the user with id doesn't exist as well 
      - **Content**:
        ```javascript
        {
         "message": `Failed to fetch user-${id}`,
         "error": "actual error message"
        }
- DELETE /user/${id} or /user/delete?id=${id}
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

- POST /cart/add 
  - adds a cart to the user cart list on our database
  - Request body
    - **Content**:
        ```javascript
        {
          "userId":"${userId},
          "quantity":50,
          "variationId":
        }
  - Returns:
    - Success Response
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "message": "cart item added succesfully."
        }
    - Error Response
      - **Code**: 400 / 500 Bad Request / Internal server error 
      - **Content**:
        ```json
        {
         "message":"Internal server error",
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
          "title": "headset",
          "description": "Experience exceptional sound quality with the JBL Headset, designed for comfort and durability. Enjoy deep bass and clear highs for an immersive listening experience. The soft ear cushions and               adjustable headband ensure all-day comfort, while the built-in microphone allows for effortless calls. With up to 20 hours of playtime on a single charge, this headset is perfect for music lovers and                       professionals alike, delivering both performance and style in a sleek design.",
          "category": "jbl",
          "price": 4000,
          "variations": [
          {
              "color": "black",
              "sizes": [
                  "xs",
                  "s",
                  "m",
                  "l",
                  "xl"
              ],
              "imgUrls": [
                  "https://jolt.com.pk/cdn/shop/files/ScreenShot2024-03-19at4.37.30PM.png?v=1710848391",
                  "https://m.media-amazon.com/images/I/61Gh-JT7YML.jpg",
                  "https://m.media-amazon.com/images/I/61oGAG5r7cL._AC_UF894,1000_QL80_.jpg"
              ],
              "stock": 30
          },
          {
              "color": "red",
              "sizes": [
                  "xs",
                  "s",
                  "m",
                  "l",
                  "xl"
              ],
              "imgUrls": [
                  "https://1pc.co.il/images/thumbs/0017683_jbl-tune-t750btnc-6925281968501_510.jpeg",
                  "https://m.media-amazon.com/images/I/61Gh-JT7YML.jpg"
              ],
              "stock": 50
          }]}
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
  - Removes a specific product and all it's references in the database
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
