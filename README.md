This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## System guide

1. You need to have **Node** and npm installed on your local machine , **Node v22** is preferred

2. Use `.env.example` and based on it create `.env.local` file in the root of the project, fill all the fields with according keys

3. Install dependencies with
```bash
npm install
```

4. Run the development server with:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

There is a few key concepts in this project  .

* **Pages** - pages of this web application are being defined using folder structure in `app` directory

* **Middleware** - middleware is a brain of this website , it desides whether user can visit page and if user can make request to an API routes ,  it is similar to `Express JS` middlewares 

* **API Routes** - they are being defined the same way as pages but addtitionally inside of folder `api` to separate the logic 

* **Server Actions** - these are only Next.js feature, thay allow to execute code on the server without defining the whole API route for that , in this project they are being placed in `lib/actions` and used for authentication, registration and sensitive data like users

* **Authentication** - authentication in this project is being handled by library `next-auth` , in this project there are both credentials sign in and OAuth2.0 with Google and GitHub

* **Business logic** - business logic is related to retrospective creation and mostly it's the Drag and drop functionality and a lot of forms .

* **Database** - NoSQL database `MongoDB` is used for this project in pair with a driver called `mongoose` . To initiate DB connection there is a function connectDB in this project
