# Instagram-Clone Application 🏁
This project was bootstrapped with Create React App, using the Redux and Redux Toolkit. It's my first fully completed React project, developed as part of my React internship. While it's not perfect, I'm proud of the work I've put into it and the skills I've developed along the way 😉.

## Features 💪
- **Authentication:** Secure user login and registration using Firebase.
- **Upload Post:** Allows users to upload posts, restricted to authenticated users.
- **Follow:** Users can follow other users to see their posts.
- **Like:** Users can like posts, and the post owner receives a real-time notification.
- **Comments:** Users can comment on posts, with support for replies to individual comments. The post owner and the comment author receive real-time notifications for interactions.
- **Story Feature:** Users can upload stories that remain visible for 24 hours before being automatically deleted via a cron job.
- **Chat Feature:** Real-time chat between users.
- **Search Users:** Users can search for other users by name or username.
- **Change Theme:** Supports both dark and light themes, allowing users to toggle between them.
- **Real-time Notifications:** Users receive real-time notifications when someone likes, comments, or follows them.

## Front-end ⚛️
- **Framework:** Created using CRA (Create React App).
- **Language:** TypeScript is the main language used throughout the app. 
- **Routing:** Handled by React Router v6. 
- **State Management:** Managed using Redux Toolkit.
- **Forms & Validation:** Implemented with React Hook Form and Joi for handling forms and validations.
- **Styling:** Material UI was used as the styling solution.

## Back-end 🌐
- **Authentication & Database:** Firebase was used as a backend as a service platform.

## Code Quality 🤨
To ensure clean, consistent, and maintainable code, the following tools were used:

- **ESLint:** For identifying and fixing problematic patterns.
- **LSLint:** For linting styles.
- **Husky:** For pre-commit and pre-push hooks, with commitlint for enforcing commit message conventions.
- **Prettier:** For code formatting to maintain a consistent style across the project.
