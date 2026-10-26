 Travlr Getaways – Full Stack Web Application

A full stack MEAN-style application for a travel company. 
The customer-facing site is rendered with Express and Handlebars, 
and the administrative side is an Angular single-page application 
(SPA). Both are backed by a REST API built on Express and MongoDB, 
with JWT-secured admin login.

Tech stack: Node.js, Express, Handlebars, Angular, MongoDB, 
Mongoose, JWT, Passport Course: CS 465 – Full Stack Development I, SNHU

Architecture

Frontend comparison (Express HTML, JavaScript, 
and SPA). The customer-facing site uses Express 
with Handlebars templates, so the server builds 
each page's HTML and sends it to the browser. 
This approach is simple, works well for mostly static 
content like the trip listings, and loads quickly on 
first view, but every navigation triggers a full page reload. 
Plain JavaScript on these pages handled small interactions 
without needing a framework. The admin side is an Angular 
SPA: the browser loads the application once, then Angular 
swaps components in and out and fetches only the data it
needs from the API. That makes the admin experience feel 
faster and more app-like, and it suits features like adding,
editing, and deleting trips without reloading. The trade-off 
is more setup (routing, services, build tooling) and a heavier 
initial load. Server-rendered pages fit content-focused 
customer views, and the SPA fits interactive admin workflows.

Why MongoDB (NoSQL). MongoDB stores data as JSON-like documents,
which matches how data moves through the rest of the stack.
A trip record (name, code, length, resort, price, description,
image) maps naturally to one document, so there was no need 
for table joins or a rigid schema. Mongoose still let me enforce 
structure with schemas and validation. MongoDB is also flexible 
if trip attributes change later, and it scales well for 
read-heavy catalog data.
Functionality

JSON vs. JavaScript, and how JSON ties the stack together. 
JavaScript is a programming language with logic, functions,
and behavior. JSON is a text-based data format that borrows 
JavaScript's object syntax but contains only data: no functions,
comments, or logic. JSON is the common language of the full stack
. MongoDB stores documents in a JSON-like format, Express
API endpoints return JSON responses, and both the Handlebars 
views and the Angular SPA consume that JSON. Because everything
speaks JSON, data moves from database to API to frontend with little translation.

Refactoring and reusable UI components.

Moving the trip data from hard-coded JSON/static files 
into MongoDB through Mongoose models, then pointing the 
Express routes at the database through controllers.
Separating routes, controllers, and models so each 
file has a single responsibility.
Building Angular services (for example, a trip data 
service and an authentication service) so components 
share one place for API calls instead of repeating fetch/http logic.
Creating reusable Angular components (for example,
a trip card used in both the listing and the admin 
views) and Handlebars partials for shared layout
pieces like the header and footer.

Reusable UI components cut duplicated code, 
keep the interface consistent, make bugs easier to fix in one place,
and speed up adding new features.

Testing

Methods, endpoints, and security. The API uses standard HTTP 
methods that map to CRUD operations: GET to retrieve trips, 
POST to create, PUT to update, and DELETE to remove. Each is
exposed at an endpoint such as /api/trips (collection) or
/api/trips/:tripCode (a single trip). I tested these with
Postman, checking status codes (200, 201, 400, 401, 404),
response bodies, and that data persisted correctly in MongoDB.
Adding security made testing harder. Once the write endpoints 
(POST, PUT, DELETE) required a JWT, every test had to first log in,
capture the token, and send it in the Authorization: Bearer header.
I also had to test the failure cases: no token, an invalid token,
and an expired token should all be rejected with 401. Passwords 
are hashed and salted rather than stored in plain text. Security 
adds layers that must be tested alongside functionality, but it
is essential for protecting admin-only actions.

Reflection

This course tied together pieces I had only seen in isolation: databases, 
APIs, server-side rendering, and a modern SPA framework. I built a complete
application from the database up to the user interface and secured 
it with token-based authentication. Skills I developed include designing 
REST APIs with Express, modeling data with Mongoose, building Angular 
components and services, implementing JWT authentication, and testing
endpoints. I also got practice with Git/GitHub, debugging across multiple 
layers, and organizing a codebase so it stays maintainable.
I am pursuing software engineering internships, and this project gives
me a concrete portfolio piece showing I can work across the whole stack,
not just one layer.
