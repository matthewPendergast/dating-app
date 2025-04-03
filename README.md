# Overview

This is a solo project I am working on to learn full-stack web development, with plans to incorporate personalized AI conversational interactivity via an external API.

The idea of it is to create a functional dating app clone from the ground up that allows users to:
- Sign up securely and create a custom profile
- Browse, filter, and match with artificial users
- Message AI-generated users with distinct personalities and active hours

It is being built with React, Tailwind, Node, Express, and PostgreSQL, and both the frontend and backend are currently hosted on Render.

[View project here](https://dating-app-ppif.onrender.com/)

## Current Progress

As of April 2025, development is on pace to meet the anticipated completion date of June 2025.

Presently, the project is in the process of building out the core features of the "User Dashboard" interface, such as creating a custom profile, browsing the userbase, connecting with and messaging other users, and more. The Home page is intended to be a showcase of these features without requiring the visitor to sign up.

After the core features have been implemented, development will shift to restoring signup/login functionality and proper backend integration--which is projected to begin in the second half of April.

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
        - ✅ Allow for editing of user profile (add images, edit personal information)
        - ✅ Implement quasi-functional Match sidebar buttons
        - ⬜ Build simulated chat system utilizing external API
        - ⬜ Add interface for browsing userbase
        - ⬜ Implement preference filters for browsing interface
    - ⬜ Login page
    - ⬜ Signup page

- **Restore Backend Functionality**
    - ⬜ Store user information in the database
        - ⬜ Optimize database queries
    - ⬜ Create basic matching system
        - ⬜ Matching algorithm

- **Future Plans**
    - ⬜ Get feedback on interface and polish design, bring it to production quality
    - ⬜ Optimize/refactor existing codebase and improve error handling
    - ⬜ Test cross-browser and device compatiblity
    - ⬜ Add proper documentation
    - ⬜ Possibly create a mobile app version (React Native or Swift)
