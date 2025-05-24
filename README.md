## Setup the project

### NestJS

```bash
npm install
cp env-example .env
```

Edit your `.env` file:

- Change `<postgres-username>` to your PostgreSQL server username
- Change `<postgres-password>` to your PostgreSQL server password

### Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

### Seeder

```bash
npm run seeder
```

## API Reference

#### Base URL

```
http://localhost:5000
```

#### Swagger Documentation

```
http://localhost:5000/api
```

## Authentication Endpoints

### Register new user

```http
POST /auth/client/register
```

| Body Parameter | Type     | Description                                                              |
| :------------- | :------- | :----------------------------------------------------------------------- |
| `username`     | `string` | **Required** **Unique** Username for the account                         |
| `email`        | `string` | **Required** **Unique** Valid email address                              |
| `password`     | `string` | **Required** Must contain letter, number, special character, min 8 chars |
| `role`         | `string` | **Required** User role (defaults to "USER")                              |

#### Response

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "user@example.com",
  "role": "USER",
  "access_token": "jwt_token",
  "message": "user has been created successfully"
}
```

---

### Login user

```http
POST /auth/login
```

| Body Parameter | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `email`        | `string` | **Required** User's email  |
| `password`     | `string` | **Required** User password |

#### Response

```json
{
  "message": "logged in successfully",
  "id": 1,
  "username": "john_doe",
  "email": "user@example.com",
  "role": "USER",
  "access_token": "jwt_token"
}
```

---

### Logout user

```http
POST /auth/logout
```

| Header Parameter | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `Authorization`  | `string` | **Required** Bearer ${access_token} |

#### Response

```json
{
  "message": "Logged out successfully"
}
```

---

### Verify Email

```http
POST /auth/verifyEmail
```

| Body Parameter | Type     | Description               |
| :------------- | :------- | :------------------------ |
| `email`        | `string` | **Required** User's email |

#### Response

```json
{
  "message": "Verification code sent successfully"
}
```

---

### Reset Password

```http
POST /auth/verifyResetPassword/:token
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `token`    | `string` | **Required** Password reset token |
| `email`    | `string` | **Required** User's email         |
| `password` | `string` | **Required** New password         |

#### Response

```json
{
  "message": "Password reset successfully"
}
```

---

## Application Endpoints

All Application endpoints require authentication with JWT token in the Authorization header.

### Get My Applications

```http
GET /application/myapplications
```

Retrieves all applications for the logged-in user.

#### Response

```json
[
  {
    "id": 1,
    "job_name": "Software Engineer",
    "job_description": "Full-stack developer position",
    "status": "PENDING",
    "user_id": 1,
    "created_at": "2024-03-20T10:00:00Z",
    "updated_at": "2024-03-20T10:00:00Z"
  }
]
```

---

### Get Application List (Admin only)

```http
GET /application/list
```

| Query Parameter      | Type     | Description                           |
| :------------------- | :------- | :------------------------------------ |
| `limit`              | `string` | **Optional** Number of items per page |
| `page`               | `string` | **Optional** Page number              |
| `application_status` | `string` | **Optional** Filter by status         |

#### Response

```json
[
  {
    "id": 1,
    "job_name": "Software Engineer",
    "job_description": "Full-stack developer position",
    "status": "PENDING",
    "user_id": 1,
    "created_at": "2024-03-20T10:00:00Z",
    "updated_at": "2024-03-20T10:00:00Z"
  }
]
```

---

### Get Application by ID

```http
GET /application/:application_id
```

| URL Parameter    | Type     | Description                 |
| :--------------- | :------- | :-------------------------- |
| `application_id` | `string` | **Required** Application ID |

#### Response

```json
{
  "data": {
    "id": 1,
    "job_name": "Software Engineer",
    "job_description": "Full-stack developer position",
    "status": "PENDING",
    "user_id": 1,
    "created_at": "2024-03-20T10:00:00Z",
    "updated_at": "2024-03-20T10:00:00Z"
  }
}
```

---

### Add Application

```http
POST /application
```

| Body Parameter    | Type     | Description                  |
| :---------------- | :------- | :--------------------------- |
| `job_name`        | `string` | **Required** Name of the job |
| `job_description` | `string` | **Required** Job description |

#### Response

```json
{
  "id": 1,
  "job_name": "Software Engineer",
  "job_description": "Full-stack developer position",
  "status": "PENDING",
  "user_id": 1,
  "created_at": "2024-03-20T10:00:00Z",
  "updated_at": "2024-03-20T10:00:00Z"
}
```

---

### Update Application

```http
PATCH /application/:application_id
```

| Parameter         | Type     | Description                     |
| :---------------- | :------- | :------------------------------ |
| `application_id`  | `string` | **Required** Application ID     |
| `job_name`        | `string` | **Optional** Name of the job    |
| `job_description` | `string` | **Optional** Job description    |
| `status`          | `string` | **Optional** Application status |

#### Response

```json
{
  "id": 1,
  "job_name": "Updated Job Name",
  "job_description": "Updated description",
  "status": "PENDING",
  "user_id": 1,
  "created_at": "2024-03-20T10:00:00Z",
  "updated_at": "2024-03-20T10:00:00Z"
}
```

---

### Delete Application by ID

```http
DELETE /application/:application_id
```

| URL Parameter    | Type     | Description                 |
| :--------------- | :------- | :-------------------------- |
| `application_id` | `string` | **Required** Application ID |

#### Response

```json
{
  "message": "application deleted",
  "data": {
    "id": 1,
    "job_name": "Software Engineer",
    "job_description": "Full-stack developer position",
    "status": "PENDING",
    "user_id": 1,
    "created_at": "2024-03-20T10:00:00Z",
    "updated_at": "2024-03-20T10:00:00Z"
  }
}
```

---

### Delete All Applications (Admin only)

```http
DELETE /application
```

#### Response

```json
{
  "message": "All applications deleted successfully"
}
```

## Application Status Values

Applications can have the following status values:

- `PENDING`: Application is waiting for review
- `REJECTED`: Application has been rejected
- `CANCELLED`: Application has been cancelled by the user
- `ACCEPTED`: Application has been accepted

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input data or request parameters
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: User doesn't have permission to perform the action
- `404 Not Found`: Requested resource not found
- `500 Internal Server Error`: Server-side error

Error responses follow this format:

```json
{
  "message": "Error description",
  "statusCode": 400
}
```
