## Setup/ Installation

The setup or installation process can be found in the project [README](https://github.com/tap-learnify/learnify-backend/blob/main/README.md)

## API Endpoints

The project includes the following endpoints:

### **POST** `/signup` - Authenticate a new user.

**Request Body:**

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "admin@example.com",
  "password": "password"
}
```

**Response:**

```
{
    "status": "success",
    "message": "User created successfully",
    "statusCode": 201,
    "data": {
        "token": "your_generated_token"
    }
}
```

### **POST** `/login` - Authenticate an existing new user.

**Request Body:**

```
{
  "email": "admin@example.com",
  "password": "password",
}
```

**Response:**

```
{
    "status": "success",
    "message": "Login Successful",
    "statusCode": 200,
    "data": {
        "token": "your_generated_token"
    }
}
```

### **POST** `/forgot-password` - Send password reset email.

**Request Body:**

```
{
  "email": "admin@example.com"
}
```

**Response:**

```
{
    "status": "success",
    "message": "Password reset email sent",
    "statusCode": 200
}
```

### **POST** `/reset-password` - Reset user password.

**Request Body:**

```
{
  "email": "john.doe@example.com",
  "resetPin": "your_6_digit_reset_pin",
  "newPassword": "new_secure_password"
}
```

**Response:**

```
{
    "status": "success",
    "message": "Password reset successful",
    "statusCode": 200
}
```

### **GET** `/courses` - Fetch all courses.

**Response:**

```
{
    "status": "success",
    "message": "Successfully fetched all courses",
    "statusCode": 200,
    "data": [
        {
            "_id": "64c799530499ff7ad5fb2693",
            "title": "Introduction to Web Development",
            "level": "Beginner",
            "rating": 4.7,
            "author": "John Doe",
            "outline": "This course covers the basics of HTML, CSS, and JavaScript...",
            "description": "Learn the fundamentals of web development and build your first websites!",
            "thumbnail_url": "https://example.com/intro_to_web_dev_thumbnail.jpg",
            "path": "Web Development",
            "subject": "HTML/CSS/JavaScript",
            "heroText": "Join our exciting Web Development course!",
            "about": "This course is designed for beginners who want to start their journey...",
            "skillsYouWillLearn": [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Web Design",
                "Web Development Basics"
            ],
            "successStories": [
                {
                    "_id": "64c7aa97da9733fd94a8b12d",
                    "studentName": "Alice",
                    "story": "Thanks to this course, I landed my first web development job!"
                },
                {
                    "_id": "64c7aa97da9733fd94a8b12e",
                    "studentName": "Bob",
                    "story": "I was able to create my personal website after completing this course."
                }
            ]/api/courses/search?search=JavaScript
        }
    ]
}
```

### **GET** `/courses/search` - Search course by title.

**Request Body:**
`/api/courses/search?keyword=Frontend`
**Response:**

```
{
    "status": "success",
    "message": "Course fetched",
    "statusCode": 200,
    "data": [
        {
            "_id": "64c799530499ff7ad5fb2693",
            "title": "Introduction to Frontend Development",
            "level": "Beginner",
            "rating": 4.7,
            "author": "John Doe",
            "outline": "This course covers the basics of HTML, CSS, and JavaScript...",
            "description": "Learn the fundamentals of web development and build your first websites!",
            "thumbnail_url": "https://example.com/intro_to_web_dev_thumbnail.jpg",
            "path": "Web Development",
            "subject": "HTML/CSS/JavaScript",
            "heroText": "Join our exciting Web Development course!",
            "about": "This course is designed for beginners who want to start their journey...",
            "skillsYouWillLearn": [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Web Design",
                "Web Development Basics"
            ],
            "successStories": [
                {
                    "_id": "64c7aa97da9733fd94a8b12d",
                    "studentName": "Alice",
                    "story": "Thanks to this course, I landed my first web development job!"
                },
                {
                    "_id": "64c7aa97da9733fd94a8b12e",
                    "studentName": "Bob",
                    "story": "I was able to create my personal website after completing this course."
                }
            ]
        }
    ]
}
```
