<div align = "center">

# learnify-backend

####  The repository holds the backend files for Learnify.

</div>

## Installation

To install and set up the project, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/davidumoru/staffVerify.git`
2. Navigate to the project directory `cd staffVerify`
3. Run `npm install` to install the project dependencies.

## Usage

To start the project, run the following command:

`npm run dev`

This will start the Express server, and the project will be accessible at the specified port.

## API Endpoints

The project includes the following endpoints:

### **POST** `/signup` - Authenticate an existing new user.
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
  "message": "User created successfully",
  "token": "asdf.lkjhglkjhgas.dBUAfkhbuBSOUu.piBSPPuihbu.WBhbhl_lbuyouVyvguougu"
}
```

### **POST** `/login` - Create a new user.
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
  "message": "Staff created successfully",
  "token": "asdf.lkjhglkjhgas.dBUAfkhbuBSOUu.piBSPPuihbu.WBhbhl_lbuyouVyvguougu"
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
