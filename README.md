# questgtl

Instructions to follow

1. Open the code in visual studio code. In Console hit this command "npm i" it will install the dependency.
2. Hit this command "nodemon app.js". It will start the node server. Server will start at localhost:3000.
3. Api gateway (Please use postman for api)

      a. localhost:3000/addProduct         // Add the product in database.
            Method - post
      
      b. localhost:3000/homepage          // Display all products
            Method - get
            
      c. localhost:3000/productListing?page=1&pageLimit=10&price=-1            // Display list with pagination and other filter
            Method - get
            
            Note : here price '-1' means high to low and '1' means low to high  
            
      d. localhost:3000/productDetail?productId=630ef99beb273a1c5150e1d6       // Product Details
            Method - get
            
      e. localhost:3000/addToCart                         //  Add the product to cart              
            Method - post
            body - productId,quantity
            
      f. localhost:3000/cartDetails                    // Shows the cart details
            Method - get

4. Hit these command in mongo shell 
      a. db.book.find().pretty()
      b. db.cart.find().pretty()
