# managment-system
# API Documentation


## Base URL
https://innobyte-backend2.onrender.com/api

## Create Project

- **Endpoint:** `project/create-project`
- **Method:** `POST`
- **Description:** Create a new project.
- **Request:**
  - Body:
    ```json
    {
      "name": "string",
      "description": "string",
      "fields": ["string"]
    }
    ```
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "project created successfully"
    }
    ```

## Delete Project

- **Endpoint:** `/project/delete-project/:projectID`
- **Method:** `DELETE`
- **Description:** Delete a specific project.
- **Parameters:**
  - `projectID`: ID of the project.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "project deleted successfully"
    }
    ```

## Get Project

- **Endpoint:** `/projects/get-project/:projectID`
- **Method:** `GET`
- **Description:** Get details of a specific project.
- **Parameters:**
  - `projectID`: ID of the project.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "name": "string",
      "description": "string",
      "fields": ["string"],
      "owner": "string"
    }
    ```

## Get Projects

- **Endpoint:** `/project/get-projects`
- **Method:** `GET`
- **Description:** Get a list of projects for the authenticated user.
- **Response:**
  - Status Code: 200 OK
  - Body: Array of Project objects

## Toggle Apply

- **Endpoint:** `/projects/toggle-apply`
- **Method:** `POST`
- **Description:** Apply or unapply for a project.
- **Request:**
  - Body:
    ```json
    {
      "projectID": "string",
      "motivation": "string"
    }
    ```
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "applied successfully"
    }
    ```

## Apply Decision

- **Endpoint:** `project/apply-decision/:applyID`
- **Method:** `PUT`
- **Description:** Accept or reject an apply for a project.
- **Parameters:**
  - `applyID`: ID of the apply.
- **Request:**
  - Body:
    ```json
    {
      "decision": "string" // 'accepted' or 'rejected'
    }
    ```
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "this apply has been accepted" // or "rejected"
    }
    ```




# API Documentation for Tasks and Submissions

## Create Task

- **Endpoint:** `task/create-task`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request:**
  - Body:
    ```json
    {
      "name": "string",
      "projectID": "string",
      "description": "string",
      "endsin": "string (date)"
    }
    ```
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "task created successfully"
    }
    ```

## Delete Task

- **Endpoint:** `task/delete-task/:taskID`
- **Method:** `DELETE`
- **Description:** Delete a specific task.
- **Parameters:**
  - `taskID`: ID of the task.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "task deleted."
    }
    ```

## Add Submission

- **Endpoint:** `task/add-submission/:taskID`
- **Method:** `POST`
- **Description:** Add a submission to a task.
- **Parameters:**
  - `taskID`: ID of the task.
- **Request:**
  - Body:
    ```json
    {
      "submittion": "string",
    }
    ```
- **Response:**
  - Status Code: 201 Created
  - Body:
    ```json
    {
      "message": "your submission has been successfully uploaded"
    }
    ```

## Evaluate Submission

- **Endpoint:** `task/evaluate-submission/:submittionID`
- **Method:** `PUT`
- **Description:** Evaluate a submission (accept or reject).
- **Parameters:**
  - `submittionID`: ID of the submission.
- **Request:**
  - Body:
    ```json
    {
      "decision": "string (accepted or rejected)",
      "feedback": "string"
    }
    ```
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "this submission has been accepted" // or "rejected"
    }
    ```

## Get Submission

- **Endpoint:** `task/get-submission/:submittionID`
- **Method:** `GET`
- **Description:** Get details of a specific submission.
- **Parameters:**
  - `submittionID`: ID of the submission.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      // Submission details
    }
    ```


# API Documentation for Authentication

## Signup User

- **Endpoint:** `user/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request:**
  - Body:
    ```json
    {
      "email": "string",
      "fullname": "string",
      "password": "string",
      "job": "string"
    }
    ```
- **Response:**
  - Status Code: 201 Created
  - Body:
    ```json
    {
      "message": "signup successfuly"
    }
    ```

## Signin User

- **Endpoint:** `user/signin`
- **Method:** `POST`
- **Description:** Sign in an existing user.
- **Request:**
  - Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "signin successfuly"
    }
    ```

## Signout User

- **Endpoint:** `user/signout`
- **Method:** `GET`
- **Description:** Sign out the currently authenticated user.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "successfuly logged out"
    }
    ```

## Get User

- **Endpoint:** `user/getuser`
- **Method:** `GET`
- **Description:** Get details of the currently authenticated user.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "user": {
        // User details (excluding password)
      }
    }
    ```
- **Note:** Requires authentication. The user's password is not included in the response.




# API Documentation for Messages

## Get Room Messages

- **Endpoint:** `message/insert-message/:projectID`
- **Method:** `GET`
- **Description:** Get messages for a specific project room.
- **Parameters:**
  - `projectID`: ID of the project.
- **Response:**
  - Status Code: 200 OK
  - Body: Array of message objects
    ```json
    [
      {
        "project": "string",
        "sender": {
          // Sender details
        },
        "content": "string",
        "createdAt": "string (timestamp)"
      },
      // Additional messages...
    ]
    ```

## Insert Message

- **Endpoint:** `/message/:roomID`
- **Method:** `POST`
- **Description:** Insert a new message into a project room.
- **Request:**
  - Body:
    ```json
    {
      "message": "string",
      "projectID": "string"
    }
    ```
- **Response:**
  - Status Code: 201 Created
  - Body:
    ```json
    {
      "message": "message sent"
    }
    ```

## Delete Message

- **Endpoint:** `/message/:messageID/delete`
- **Method:** `DELETE`
- **Description:** Delete a specific message.
- **Parameters:**
  - `messageID`: ID of the message.
- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "message deleted"
    }
    ```
- **Note:** Only the sender of the message can delete it.







## Error Handling

- **400 Bad Request:**
  - Invalid request format.
  - Missing required fields.
  - Project already exists.
  - Invalid decision in applyDecision.

- **403 Forbidden:**
  - User does not have access to change apply status.

- **404 Not Found:**
  - Project or apply not found.

- **500 Internal Server Error:**
  - Server-side error.

## Authentication

- The API requires authentication using user sessions or tokens. Include the authentication token in the headers of each request.

## Rate Limiting

- Requests are limited to 1000 per hour per IP address.

## Response Format

- Responses are in JSON format.
