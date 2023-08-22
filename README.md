<div align = "center">

# learnify-backend

#### The repository holds the backend files for Learnify.

</div>

## Installation

To install and set up the project, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/tap-learnify/learnify-backend.git`
2. Navigate to the project directory `cd learnify-backend`
3. Run `npm install` to install the project dependencies.

## Usage

To start the project, run the following command:

`npm run dev`

This will start the Express server, and the project will be accessible at the specified port.

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

## Technologies

The project includes the following technologies:

- Node.js
- Express.js
- MongoDB
- bcrypt
- jsonwebtoken

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
3. Make changes and Commit them: `git commit -m "Add some feature"`
4. Push the branch to your forked repository: `git push origin feature-name`
5. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for more information.
