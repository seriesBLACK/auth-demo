import "../css files/home.css";
export default function Home() {
  return (
    <div className="homeCon">
      <h1 className="homeHeader">Welcome to Mern-Auth</h1>
      <div className="homeSec">


        <p>This is a full-stack web application built with the MERN (MongoDB,
          Express, React, Node.js) stack. It includes authentication features that
          allow users to sign up, log in, and log out, and provides access to
          protected routes only for authenticated users.</p>
        <p>The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).</p>
        <p>This application is intended as a starting point for building full-stack
          web applications with authentication using the MERN stack.</p>
      </div>
    </div>
  )
}
