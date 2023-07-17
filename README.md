# Pintac

Pinterest-like application where users can create boards, save pins to those boards, and share their inspirations with others.
Features

## Table of Contents

    Features
    Technologies Used
    Usage
    Collaborators
    Challenges
    Next Steps

## Feature

    User Registration: Users can create an account to access the application.
    Board Creation: Users can create boards to categorize their inspirations.
    Pinning: Users can save pins to their boards, providing a title, description, and image.
    View Boards: Users can view all boards to discover and explore inspirations.
    Deployment: The application is deployed on Heroku and can be accessed at:
    
     https://pintac-3dc0a42401e6.herokuapp.com/.

## Technologies Used

    Node.js
    Express.js
    MongoDB (with Mongoose)
    HTML/CSS
    JavaScript

# Usage

    Visit the deployed application at https://pintac-3dc0a42401e6.herokuapp.com/.
    Register for a new account or log in if you already have an account.
    Create boards to categorize your inspirations.
    Save pins to your boards by providing a title, description, and image.
    Explore other users' boards and discover inspirations.
    Edit or delete your boards and pins as needed.

## Collaborators

    Mabel Lam - https://github.com/mabelam
    Vivien Pham  - https://github.com/vivienkp
    Rushang Patel - https://github.com/rushang-patel
    Romello Potts -  https://github.com/RomelloP

## Challenges

During the development process, we encountered several challenges that tested our problem-solving skills and perseverance. Here are some of the main challenges we faced:

1. Routing Users to Pins and Boards:
   One of the initial hurdles we encountered was properly routing users to their respective pins and boards. We encountered issues with mapping the correct routes, resulting in users being redirected to incorrect pages. Through careful code review and extensive debugging sessions, we were able to resolve these routing issues and ensure users were directed to the intended content.

2. Deletion Limitations for Pin Creators:
   We faced a challenge with implementing deletion functionality specifically for the creators of pins. Since each login with Google OAuth and Mongo generated a new ID, once a pin was posted and the user logged out, there was no straightforward way to delete that pin or any associated boards created by the user. We had to devise a solution to handle this limitation and provide appropriate delete functionality while maintaining the security and integrity of the system.

3. Integration of OAuth and Mongo:
   This project aimed to leverage OAuth for user authentication and connection with MongoDB for data storage. Integrating these two technologies seamlessly presented its own set of challenges. We needed to establish a reliable and secure connection between the project and OAuth, ensuring that user authentication and authorization worked as intended. Additionally, syncing OAuth-generated IDs with MongoDB for consistent user data management required careful consideration and implementation.

Despite these challenges, we remained determined and committed to overcoming each obstacle. We believe that we have successfully laid the foundation for the project by effectively utilizing OAuth and integrating it with MongoDB. This enables users to authenticate securely and efficiently manage their pins and boards.

By navigating through these challenges, we have gained valuable experience and enhanced our skills in developing robust and user-friendly applications.

## Next Steps

    Collaboration with other users and their boards
    Would like all boards to feature boards, along with a preview of the pins residing within them.
    A like feature, so other users can like your content.
    A share function to other applications such as Instagram, Facebook, Twitter, etc
    Camera feature to capture pins on demand

