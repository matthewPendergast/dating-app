# Overview

This is a solo project I am working on to learn full-stack web and mobile app development, with plans to incorporate personalized AI conversational interactivity via an external API.

The idea of it is to create a functional dating app clone from the ground up that allows users to:
- Sign up securely and create a custom profile
- Browse, filter, and match with artificial users
- Message AI-generated users with distinct personalities and active hours

It is being built with React, Tailwind, Node, Express, and PostgreSQL, and both the frontend and backend are currently hosted on Render.

[View project here](https://dating-app-ppif.onrender.com/)

## Roadmap

- **Design Frontend (HTML, CSS, JavaScript, Sass)**
    - ✅ Index page (initial mockup of dating app interface)
    - ✅ Signup page (basic chat/messaging system mockup for signup form)

- **Initial Backend (Node, Express, PostgreSQL)**
    - ✅ Create a server, host site on Render
    - ✅ User signup (validate form input, store data securely)
    - ✅ User login (authenticate credentials)
    - ✅ Database integration
    - ✅ Build basic API
    - ✅ Deploy production-ready backend

- **Implement Frontend (React, Tailwind CSS)**
    - ✅ Dashboard page (mockup)
    - 🔄 Implement Dashboard functionality
        - ✅ Image interactions (modals, Match Sidebar image slider)
        - ✅ Make Match 'View Profile' interface
        - ✅ Make User 'View Profile' interface
        - ✅ Improve mobile UI
        - ✅ Messaging interface (view Like/Match messages)
        - 🔄 Implement quasi-functional Match sidebar buttons
        - 🔄 Allow for editing of user profile (add images, edit personal information)
        - ⬜ Add interface for browsing userbase
        - ⬜ Implement preference filters for browsing interface
    - ⬜ Login page
    - ⬜ Signup page

- **Expand Functionality**
    - ⬜ Implement fully-realized messaging system
        - ⬜ Store message history
        - ⬜ Build simulated chat system utilizing external API
    - ⬜ Create basic matching system
        - ⬜ Matching algorithm
    - ⬜ Create mobile app (React Native or Swift)