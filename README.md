# PresentConnectionTask documentation

## About project

Technologies used for the project:

* Front end - **ReactJs**
* Node.js version - v19.3.0
* Back end - **ASP.NET core 7.0**
* Database - **MSSQL Server**

## Instructions on launching application

* Clone the git repository
```bash
git clone https://github.com/JustasVai/PresentConnectionTask.git
cd PresentConnectionTask
```

To build Docker Containers for an API:
* Backend start
```bash
cd API/API
docker-compose up
```


* Frontend start
```bash
cd frontend
npm install
npm start
```

* Navigate to http://localhost:3000 to get started!
## Task implementation

* Home page 

![image](https://user-images.githubusercontent.com/67903431/212543957-30b729b1-5d16-4964-9edc-6162fba2ff6e.png)

* Add new restaurant form page(pressed button "Create restaurant")

![image](https://user-images.githubusercontent.com/67903431/212544011-5599014d-2380-42ca-8e03-badaea94275d.png)

* Required text fields

![image](https://user-images.githubusercontent.com/67903431/212544020-290ebea2-e800-40da-ace4-bf11653e24e9.png)

* Filled form

![image](https://user-images.githubusercontent.com/67903431/212544057-95af56eb-ce91-46d2-b5e2-5d3241b333dc.png)

* Pressed button('Create')

![image](https://user-images.githubusercontent.com/67903431/212544108-cb5a1579-0ab5-444a-89da-a6d46443d44e.png)

* Home table with new restaurant

![image](https://user-images.githubusercontent.com/67903431/212544121-f3c5e8b3-cae8-4661-bc49-df2fb076a311.png)

* Details page when pressed on restaurant row in table

![image](https://user-images.githubusercontent.com/67903431/212544149-4a07c09a-8c43-4ead-aa19-ad0c3ba29321.png)

* Added more restaurants to check pagination

![image](https://user-images.githubusercontent.com/67903431/212544223-237d9bd6-3818-4208-b998-32eaf3dc4d97.png)

![image](https://user-images.githubusercontent.com/67903431/212544250-b30b6bd2-97eb-4960-92c2-32e080ad0254.png)



## API documentation

## API V1  http://localhost:8080/api/v1/{path}:

### ***To post new restaurant:***

For checking POST request in **Postman** *(or other software)* add header:
* **Content-Type** with value of **application/json**

**Required parameters:**

* Restaurant name (in request - **name**)

* Description (in request - **description**)

* Phone number (in request - **phoneNumber**)

**Optional parameters:**

* Restaurant rating (in request - **rating**)

```http
POST /restaurants/
```

#### **Example Request body:**

```JSON
{
    "name" : "string",
    "description" : "string",
    "phoneNumber": "string",
    "rating": 0
}
```

#### **Example Response body:**

```JSON
{
    "id": 1,
    "name": "string",
    "description": "string",
    "phoneNumber": "string",
    "rating": 0,
    "creationDate": "2023-01-15T13:10:15.0756338Z"
}
```

### ***To get sepcific restaurant:***

```http
GET /restaurants/{restaurantId}
```

#### **Example Response body:**

```JSON
{
    "id": 2,
    "name": "string",
    "description": "string",
    "phoneNumber": "string",
    "rating": 0,
    "creationDate": "2023-01-15T13:10:15.0756338"
}
```

### ***To get all restaurants:***

```http
GET /restaurants/
```

#### **Example Response body:**

```JSON
[
    {
        "id": 1,
        "name": "string",
        "description": "string",
        "phoneNumber": "string",
        "rating": 0,
        "creationDate": "2023-01-15T13:02:40.4768214"
    },
    {
        "id": 2,
        "name": "string",
        "description": "string",
        "phoneNumber": "string",
        "rating": 1,
        "creationDate": "2023-01-15T13:10:15.0756338"
    }
]
```

#### Pagination
<pre>
With parameters pageSize and pageNumber
Default pageSize = 7 and pageNumber = 1
Add these parameters to get specific page of content with page size.
</pre>

#### **Example http Request:**
```http
GET /restaurants/?pageNumber=1&pageSize=2
```

#### **Example Response body:**

```JSON
[
    {
        "id": 1,
        "name": "string",
        "description": "string",
        "phoneNumber": "string",
        "rating": 0,
        "creationDate": "2023-01-15T13:02:40.4768214"
    },
    {
        "id": 2,
        "name": "string",
        "description": "string",
        "phoneNumber": "string",
        "rating": 1,
        "creationDate": "2023-01-15T13:10:15.0756338"
    }
]
```

**Example Response header Pagination:**

```JSON
{
  "totalCount":2,
  "pageSize":2,
  "currentPage":1,
  "totalPages":1,
  "previousPageLink":null,
  "nextPageLink":null
}
```
#### Filtering

With parameters name, description, phoneNumber we can filter response.

#### **Example http Request:**

```http
GET /restaurants/?name=string&description=string&phoneNumber=string
```
#### **Example Response body:**


```JSON
[
    {
        "id": 1,
        "name": "string",
        "description": "string",
        "phoneNumber": "string",
        "rating": 0,
        "creationDate": "2023-01-15T13:02:40.4768214"
    },
    {
        "id": 2,
        "name": "string",
        "description": "string",
        "phoneNumber": "string",
        "rating": 1,
        "creationDate": "2023-01-15T13:10:15.0756338"
    }
]
```
