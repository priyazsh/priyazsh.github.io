# Top 350 MERN Stack + JavaScript + DevOps Interview Questions for Indore IT Companies

*Compiled for interviews at Indore-based IT companies including Impetus, Accenture, Infosys, TCS, Persistent Systems, and local startups*

---

## JavaScript Fundamentals (Questions 1-30)

### Core Concepts

1. **What is the difference between `var`, `let`, and `const`?**
2. **Explain hoisting in JavaScript with examples.**
3. **What are closures? Provide a practical use case.**
4. **What is the difference between `==` and `===`?**
5. **Explain the concept of "this" keyword in JavaScript.**
6. **What are arrow functions and how do they differ from regular functions?**
7. **What is the difference between `null` and `undefined`?**
8. **Explain event bubbling and event capturing.**
9. **What is the difference between synchronous and asynchronous JavaScript?**
10. **What are callbacks and what is callback hell?**

### Advanced JavaScript

11. **Explain Promises and their states.**
12. **What is async/await and how does it work?**
13. **What is the Event Loop in JavaScript?**
14. **Explain the difference between `call()`, `apply()`, and `bind()`.**
15. **What are Higher-Order Functions?**
16. **What is the difference between shallow copy and deep copy?**
17. **Explain prototypal inheritance in JavaScript.**
18. **What are generator functions?**
19. **What is destructuring in JavaScript?**
20. **Explain the spread and rest operators.**
21. **What is the difference between `map()`, `filter()`, and `reduce()`?**
22. **What are template literals?**
23. **Explain the concept of currying.**
24. **What is memoization?**
25. **What are Symbols in JavaScript?**
26. **Explain WeakMap and WeakSet.**
27. **What is the difference between function declaration and function expression?**
28. **What are IIFE (Immediately Invoked Function Expressions)?**
29. **Explain the `new` keyword and how it works.**
30. **What is the prototype chain?**

### Scope, Execution & Memory

31. **What are the different types of scope in JavaScript (global, function, block)?**
32. **What is the Temporal Dead Zone (TDZ)?**
33. **What is an execution context and what does the call stack do?**
34. **Explain the difference between microtask queue and macrotask queue.**
35. **What is type coercion in JavaScript? Give examples of implicit vs explicit coercion.**
36. **What is event delegation and why is it useful?**
37. **What is the difference between pass by value and pass by reference in JavaScript?**
38. **What is garbage collection in JavaScript and how does it work?**
38. ANS -> Garbage collection in JavaScript is an automated process where the JavaScript engine manages memory by finding and deleting data that is no longer needed by the program.

39. **What is strict mode (`"use strict"`) and what does it change?**
40. **Explain `try`, `catch`, `finally` — what are different Error types in JavaScript (TypeError, ReferenceError, SyntaxError)?**

### Browser APIs & Storage

41. **What is the difference between `localStorage`, `sessionStorage`, and cookies?**
42. **What is the difference between `setTimeout`, `setInterval`, and `requestAnimationFrame`?**
43. **Explain `JSON.parse()` and `JSON.stringify()` — what are their limitations?**
44. **What is the Fetch API and how does it differ from XMLHttpRequest?**
45. **What is the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`?**

---

## ES6+ Features (Questions 46-60)

46. **What are classes in ES6?**
47. **Explain static methods in JavaScript classes.**
48. **What are modules in JavaScript (import/export)?**
49. **What is the difference between named export and default export?**
50. **Explain optional chaining (`?.`) operator.**
51. **What is the nullish coalescing operator (`??`)?**
52. **What are Set and Map in JavaScript?**
53. **Explain the `for...of` vs `for...in` loops.**
54. **What are tagged template literals?**
55. **Explain object property shorthand.**
56. **What is the `Object.freeze()` method?**
57. **What is the difference between `Object.seal()` and `Object.freeze()`?**
58. **Explain computed property names.**
59. **What are default parameters in functions?**
60. **What is the purpose of `Object.entries()`, `Object.values()`, and `Object.keys()`?**
61. **What are `Object.assign()` and `Object.create()` used for?**
62. **What is the Proxy object and the Reflect API in JavaScript?**
63. **What are iterators and iterables in JavaScript?**

---

## React.js (Questions 64-105)

### React Basics

64. **What is React and what are its key features?**
65. **What is JSX?**
66. **What are components in React?**
67. **What is the difference between functional and class components?**
68. **Explain the Virtual DOM concept.**
69. **What are props in React?**
70. **What is state in React?**
71. **What is the difference between state and props?**
72. **Explain the component lifecycle methods.**
73. **What are React Hooks?**

### React Hooks

74. **Explain `useState` hook with an example.**
75. **What is `useEffect` and when to use it?**
76. **What is `useContext` hook?**
77. **Explain `useReducer` hook.**
78. **What is `useRef` and its use cases?**
79. **What is `useMemo` and when should you use it?**
80. **What is `useCallback` hook?**
81. **What is the difference between `useMemo` and `useCallback`?**
82. **How to create custom hooks?**
83. **What is `useLayoutEffect` and how it differs from `useEffect`?**

### React Advanced

84. **What is React Context API?**
85. **Explain prop drilling and how to avoid it.**
86. **What are Higher-Order Components (HOC)?**
87. **What are render props?**
88. **What is code splitting in React?**
89. **Explain React.lazy() and Suspense.**
90. **What is React Router and how to implement routing?**
91. **What are controlled and uncontrolled components?**
92. **How to handle forms in React?**
93. **What is the key prop and why is it important?**

### React Performance & Patterns

94. **What is `React.memo()` and when should you use it?**
95. **What are Error Boundaries in React?**
96. **What are React Portals and when do you use them?**
97. **Explain the reconciliation algorithm (diffing) in React.**
98. **What are synthetic events in React?**
99. **What is React Strict Mode and what does it do?**
100. **What is `forwardRef` and `useImperativeHandle`?**
101. **What is React Fiber?**
102. **Explain automatic state batching in React 18.**
103. **What is `useTransition` and `useDeferredValue` in React 18?**
104. **What are Pure Components and how do they differ from regular components?**
105. **What are the different techniques for conditional rendering in React?**

---

## Node.js (Questions 106-145)

### Node.js Fundamentals

106. **What is Node.js and why is it used?**
107. **What is the difference between Node.js and browser JavaScript?**
108. **Explain the Node.js event loop.**
109. **What are modules in Node.js?**
110. **What is the difference between `require()` and `import`?**
111. **What is npm and what is package.json?**
112. **What is the purpose of node_modules folder?**
113. **Explain blocking vs non-blocking code in Node.js.**
114. **What are streams in Node.js? Explain their types (Readable, Writable, Duplex, Transform).**
115. **What is the buffer class in Node.js?**
115. ANS -> Buffer class Node.js ka ek built-in global class hai jo binary data (yaani 0 aur 1 ke format mein raw data) ko handle aur manipulate karne ke kaam aata hai.

116. **What are EventEmitters in Node.js?**
116. ANS -> used to fire or start the event.

117. **Explain the `fs` module — difference between sync and async file operations.**
118. **What is the `path` module and its common methods (`join`, `resolve`, `basename`)?**
119. **What are global objects in Node.js (`__dirname`, `__filename`, `process`, `global`)?**
120. **What is the error-first callback pattern in Node.js?**

### Express.js

121. **What is Express.js?**
122. **How to create a basic server using Express?**
123. **What are middleware functions in Express?**
124. **Explain different types of middleware (application, router, error-handling, third-party).**
125. **What is the difference between `app.use()` and `app.get()`?**
125. ANS -> Main difference yeh hai ki app.use() ko Middleware register karne ke liye use kiya jata hai, jabki app.get() ko Specific Routes handle karne ke liye use kiya jata hai.

app.use() kisi specific HTTP method (GET, POST, PUT, DELETE) ko nahi dekhta. Yeh saare HTTP methods par trigger hota hai.
app.get() sirf aur sirf tabhi trigger hota hai jab incoming request ka method GET hota hai.

126. **How to handle errors in Express (error-handling middleware)?**
127. **What is routing in Express?**
128. **How to serve static files in Express?**
129. **What are route parameters and query parameters?**
130. **Explain CORS and how to enable it in Express.**
131. **What is the difference between `PUT` and `PATCH` methods?**
132. **How to do input validation in Express (Joi / express-validator)?**
133. **What is Helmet.js and how does it improve security?**
134. **How to handle cookies and sessions in Express?**
Cookies (cookie-parser):Data user ke browser mein store hota hai.res.cookie('name', 'value') se create hota hai aur req.cookies se read hota hai.Security ke liye hamesha { httpOnly: true, secure: true } use karna chahiye taaki hackers isse steal na kar sakein.
Sessions (express-session):Sensitive data server-side memory mein store hota hai.Browser mein sirf ek unique connect.sid (Session ID) cookie jati hai.req.session.user = data se save hota hai aur req.session.destroy() se clear hota hai.Production mein ise RAM ke bajaye MongoDB ya Redis mein store karna best practice hai

135. **What is rate limiting and how to implement it in Express?**

### Advanced Node.js

136. **What is clustering in Node.js?**
"Node.js by default single-threaded hota hai. Clustering multiple worker processes create karta hai jo CPU ke saare cores utilize karte hain. Isse application zyada requests handle kar sakti hai, performance improve hoti hai aur fault tolerance bhi milta hai. Production me PM2 cluster mode commonly use kiya jata hai."

137. **How to handle file uploads in Node.js (Multer)?**
138. **What are child processes in Node.js?**
139. **Explain authentication and authorization.**
140. **What is JWT (JSON Web Token) — how does it work (header, payload, signature)?**
141. **What are Worker Threads in Node.js and how are they different from child processes?**
142. **What is GraphQL and how does it differ from REST?**
143. **What is WebSocket and how is it implemented in Node.js (Socket.io)?**
144. **How to structure a large Node.js project (MVC pattern)?**
145. **What is the difference between `process.nextTick()` and `setImmediate()`?**

---

## MongoDB (Questions 146-180)

### MongoDB Basics

146. **What is MongoDB and why use it?**
147. **What is the difference between SQL and NoSQL databases?**
148. **Explain MongoDB document structure.**
149. **What are collections in MongoDB?**
150. **What is BSON?**
151. **Explain CRUD operations in MongoDB.**
152. **What is the `_id` field in MongoDB?**
153. **How to connect MongoDB with Node.js?**
154. **What is Mongoose?**
155. **What are schemas in Mongoose?**
156. **What is the difference between a Mongoose model and a schema?**
157. **What is MongoDB Atlas and how to set it up?**

### MongoDB Advanced

158. **What are indexes in MongoDB and why are they important?**
159. **What are compound indexes and how do they differ from single-field indexes?**
160. **Explain aggregation pipeline in MongoDB (`$match`, `$group`, `$project`, `$sort`, `$lookup`).**
161. **What is the difference between `find()` and `findOne()`?**
162. **How to perform joins in MongoDB (`$lookup`)?**
163. **What are embedded documents vs references? When to use which?**
"Embedded documents me related data same document ke andar store hota hai, jo fast reads provide karta hai. References me related documents alag collections me hote hain aur IDs ke through linked hote hain, jo scalability aur maintainability improve karte hain. Small and tightly coupled data ke liye embedding aur large or growing relationships ke liye references use karunga."

164. **Explain MongoDB transactions.**
Transaction ka matlab :- Multiple database operations ko ek single unit ki tarah execute karna. Ya to sab successful honge ya sab rollback ho jayenge.

MongoDB Transaction = Either all database operations succeed, or all are rolled back. 🚀

165. **What is sharding in MongoDB?**
166. **What is replication in MongoDB?**
167. **How to handle validation in Mongoose?**
"Mongoose me validation schema level par define ki jati hai. Common validations me required, min, max, minlength, maxlength, enum, match aur custom validators aate hain. Validation invalid data ko database me save hone se rokta hai. Updates ke liye runValidators:true use karna chahiye."

168. **What are Mongoose middleware/hooks (pre and post)?**
169. **What are race conditions in MongoDB and how to prevent them?**
170. **What are atomic operations in MongoDB (`$inc`, `$set`, `$push`, `$pull`)?**
"Atomic operations MongoDB ke update operators hote hain jo single document par safe updates perform karte hain. $inc number increment/decrement karta hai, $set field update karta hai, $push array me item add karta hai aur $pull array se item remove karta hai. Ye race conditions avoid karne aur concurrent updates safely handle karne ke liye bahut important hote hain."

171. **What is population (`populate()`) in Mongoose?**
Definition -> populate() Mongoose ka feature hai jo reference (ObjectId) ko actual document data se replace kar deta hai.
Simple words me:- MongoDB ka JOIN jaisa kaam karta hai.

172. **What are virtuals in Mongoose?**
173. **What is the difference between `updateOne()` and `findOneAndUpdate()`?**
174. **How to implement pagination in MongoDB (skip/limit vs cursor-based)?**
175. **What is text search in MongoDB and how to create a text index?**
176. **What are TTL (Time-To-Live) indexes in MongoDB?**
177. **What are capped collections in MongoDB?**
CAPPED Collection are thus collections jinka sab kuch fixed hota h like -> size, order or limit hoti h...

178. **How to use `$in`, `$nin`, `$exists`, `$regex` operators in MongoDB?**
179. **What are Mongoose discriminators?**
180. **How to handle schema migrations in MongoDB (schema versioning)?**

---

## Full Stack Integration (Questions 181-200)

181. **How does the MERN stack work together?**
182. **Explain the flow of data in a MERN application.**
183. **How to make API calls from React to Node.js backend (Axios/Fetch)?**
184. **What is REST API and what are RESTful design principles?**
185. **What are HTTP methods (GET, POST, PUT, DELETE, PATCH)?**
186. **What are status codes (200, 201, 400, 401, 403, 404, 500, etc.)?**
187. **How to handle authentication in MERN stack?**
188. **What is session-based vs token-based authentication?**
"Session-based authentication me server user session store karta hai aur client sirf session ID bhejta hai. Token-based authentication me server JWT token generate karta hai aur client har request me token bhejta hai. Session stateful hota hai, jabki JWT stateless hota hai. MERN applications me generally JWT use kiya jata hai kyunki ye scalable aur API-friendly hota hai."

SESSION-BASED -> Store in Server/db and it is Statefull.
TOKEN-BASED -> Storeed in clients/browsers header and it is Stateless.

189. **How to implement file upload in MERN stack?**
190. **What is environment variable and how to use `.env` files?**
191. **How to deploy a MERN application?**
192. **What is the difference between development and production builds?**
193. **How to handle state management in large React applications?**
194. **What is Redux and when to use it?**
Redux ek state management library hai jo application ka shared/global data manage karti hai.

Simple words me:
Redux ek centralized store provide karta hai jahan application ka common data rakha jata hai.

195. **Explain Redux core concepts (store, actions, reducers, dispatch).**
196. **What is Redux Toolkit and how does it simplify Redux?**
197. **What are API design best practices (versioning, naming, error responses)?**
198. **What is the difference between SSR (Server-Side Rendering) and CSR (Client-Side Rendering)?**
"CSR me browser JavaScript download karke page render karta hai, jabki SSR me server pehle HTML generate karke browser ko bhejta hai. CSR single-page applications ke liye suitable hai, jabki SSR SEO-sensitive applications jaise blogs, news sites aur e-commerce websites ke liye better hota hai."

CSR = Browser builds the page. SSR = Server builds the page before sending it to the browser. 🚀

199. **What is Next.js and how does it relate to React?**
200. **How to handle image/file storage in a MERN app (Cloudinary, S3, local)?**

---

## Logical & Coding Questions (Questions 201-215)

### Array & String Problems

201. **Write a function to reverse a string.**
202. **How to find duplicate elements in an array?**
203. **Write a function to check if a string is a palindrome.**
204. **How to remove duplicates from an array?**
205. **Write a function to find the largest number in an array.**

### Problem Solving

206. **Write a debounce function.**
Debouncing ka matlab:
Function ko tab execute karo jab user kuch time tak action karna band kar de.

207. **Write a throttle function.**
Throttling ka matlab:
Function ko fixed interval par execute karna, chahe event kitni bhi baar trigger ho.

208. **Implement a function to flatten a nested array.**
209. **How to check if two objects are equal (deep comparison)?**
210. **Write a function to implement Array.prototype.map() from scratch.**

### Async Programming

211. **Write code to fetch data from multiple APIs in parallel.**
212. **How to handle multiple promises using Promise.all()?**
213. **Implement a simple promise from scratch.**
214. **Write a function that retries an API call on failure.**
215. **Create a custom async function that processes an array sequentially.**

---

## Scenario-Based / Real-World Questions (Questions 216-265)

### React Scenarios

216. **You notice your React app re-renders the entire component tree when a single input field changes. How would you diagnose and fix this?**
217. **A user reports that after logging in, they are redirected back to the login page on refresh. What could be the issue and how would you debug it?**
218. **Your React app works perfectly in development but shows a blank white screen in production. What steps would you take to debug this?**
219. **You have a form with 20 fields and performance is laggy while typing. How would you optimize it?**
220. **Two sibling components need to share state but they are deeply nested. How would you approach this without prop drilling?**
221. **Your useEffect is running in an infinite loop. What are the possible causes and how do you fix it?**
222. **A junior developer added an API call directly inside the render method of a class component. What problems will this cause and how should it be refactored?**
223. **Users report that stale data is showing after navigating back to a page. How would you ensure fresh data is loaded?**
224. **You need to show a loading spinner while data is being fetched, an error message if the API fails, and the data on success. How would you structure this?**
225. **Your React app needs to work offline and sync data when the user comes back online. How would you design this?**

### Node.js / Express Scenarios

226. **Your Express API is responding slowly under heavy traffic. How would you identify the bottleneck and optimize it?**
227. **A POST endpoint is receiving data but `req.body` is undefined. What could be wrong and how do you fix it?**
228. **You need to ensure that only authenticated users can access certain routes. How would you implement middleware for this?**
229. **Your Node.js server crashes in production with "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory." What do you do?**
230. **Two different routes need the same validation logic. How would you avoid code duplication?**
231. **A third-party API your app depends on starts rate-limiting your requests. How would you handle this?**
232. **Your API needs to send an email after user registration but you don't want the user to wait for the email to be sent. How would you handle this?**
233. **You discover that sensitive data (passwords, tokens) is being logged in your production server logs. How do you fix this?**
234. **Your file upload endpoint works for small files but times out for files larger than 10MB. How would you fix this?**
235. **Multiple developers are working on the API and there's no documentation. How would you set up API documentation?**

### MongoDB / Database Scenarios

236. **Your MongoDB queries are getting slower as the collection grows to millions of documents. How would you diagnose and fix this?**
237. **A user deletes their account but their comments and posts are still showing everywhere. How would you handle cascading deletes?**
238. **You need to store user activity logs that could grow to billions of records. How would you design the schema?**
239. **Two users try to book the last available seat at the same time. How would you handle this race condition in MongoDB?**
240. **Your app needs to search products by name, category, price range, and rating simultaneously. How would you design the query and indexes?**
241. **You accidentally pushed a migration that dropped a field from all user documents in production. How would you recover?**
242. **Your MongoDB is running on a single server and the client wants 99.9% uptime. What changes would you recommend?**
243. **You need to move from an embedded document design to a referenced document design without downtime. How would you approach this?**
244. **A report query joins 4 collections and takes 30 seconds. How would you optimize it?**
245. **Your app stores user uploaded images as Base64 in MongoDB and the database size is growing rapidly. What's a better approach?**

### Full Stack / Integration Scenarios

246. **A user reports they can see another user's data after logging in. How would you debug and fix this security issue?**
247. **Your MERN app works on localhost but after deployment, API calls return CORS errors. How do you fix this?**
248. **The frontend team and backend team are working in parallel. The API isn't ready yet but the frontend needs data. How would you handle this?**
249. **Your app needs to show real-time notifications (e.g., new message received). How would you implement this in MERN stack?**
250. **A form submits successfully but the user clicks the submit button multiple times, creating duplicate entries. How do you prevent this?**
251. **Your app needs to support multiple languages (i18n). How would you design this in a MERN application?**
252. **Users complain that image uploads are very slow. The images are 5-10MB each. How would you optimize the upload flow?**
253. **You need to implement a "forgot password" flow. Walk through how you would design this end-to-end.**
254. **Your application needs role-based access control (Admin, Editor, Viewer). How would you implement this across frontend and backend?**
255. **The client wants the app to work as a PWA (Progressive Web App). What changes would you make to your existing MERN app?**

### Debugging & Performance Scenarios

256. **Your React app has a memory leak — the browser tab's memory usage keeps growing. How would you find and fix it?**
257. **An API endpoint returns correct data in Postman but the React frontend shows an error. What could be wrong?**
258. **Your app's Lighthouse performance score is 35. What steps would you take to improve it?**
259. **A user reports that the app is extremely slow on mobile but works fine on desktop. How would you investigate?**
260. **After deploying a new version, some users see the old version and some see the new one. What's happening and how do you fix it?**
261. **Your JWT token expires after 1 hour and users complain about being logged out mid-work. How would you implement token refresh?**
262. **You need to implement pagination for an API that returns 100,000+ records. What are the different approaches and trade-offs?**
263. **Your Express server is vulnerable to SQL/NoSQL injection. How would you identify and fix these vulnerabilities?**
264. **The client wants to add Google and Facebook OAuth login to your existing email/password auth system. How would you integrate this?**
265. **Your MERN app needs to handle 10,000 concurrent users. What architectural changes would you make?**

---

## Git & GitHub (Questions 266-280)

266. **What is Git and how is it different from GitHub?**
267. **What is the difference between `git pull` and `git fetch`?**
268. **What is a branch in Git and why do we use branches?**
269. **What is the difference between `git merge` and `git rebase`?**
270. **What is a merge conflict and how do you resolve it?**
271. **What is `git stash` and when would you use it?**
272. **What is the difference between `git reset` and `git revert`?**
273. **Explain the Git flow workflow (main, develop, feature, release, hotfix branches).**
274. **What is a pull request (PR) and why is it important?**
275. **What is `.gitignore` and what files should be added to it?**
276. **What is the difference between `git clone` and `git fork`?**
277. **How do you undo the last commit without losing changes?**
278. **What is `git cherry-pick`?**
279. **What are GitHub Actions and how are they used?**
280. **What is the difference between `git add .` and `git add -A`?**

---

## Docker (Questions 281-295)

281. **What is Docker and why is it used?**
282. **What is the difference between a Docker image and a Docker container?**
283. **What is a Dockerfile? Write a basic Dockerfile for a Node.js application.**
284. **What is Docker Compose and when would you use it?**
285. **What is the difference between Docker and a Virtual Machine (VM)?**
286. **What are Docker volumes and why are they needed?**
287. **What is a Docker registry (Docker Hub)?**
288. **How do you expose a port in Docker?**
289. **What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile?**
290. **What is multi-stage build in Docker?**
291. **How would you containerize a MERN stack application?**
292. **What is the `.dockerignore` file?**
293. **How do you check running containers and their logs?**
294. **What is the difference between `docker stop` and `docker kill`?**
295. **How do containers communicate with each other in Docker?**

---

## Redis (Questions 296-305)

296. **What is Redis and what is it used for?**
297. **What is the difference between Redis and MongoDB?**
298. **What are the common data types in Redis?**
299. **How is Redis used for caching in a Node.js application?**
300. **What is Redis pub/sub and how does it work?**
301. **What is the difference between Redis and Memcached?**
302. **How do you set an expiration time (TTL) on a Redis key?**
303. **What is Redis persistence (RDB vs AOF)?**
304. **How would you use Redis for session management in an Express app?**
305. **What are Redis Streams and when would you use them?**

---

## CI/CD (Questions 306-315)

306. **What is CI/CD and why is it important?**
307. **What is the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment?**
308. **What are some popular CI/CD tools?**
309. **How would you set up a basic CI/CD pipeline for a MERN project using GitHub Actions?**
310. **What is a build pipeline and what stages does it typically have?**
311. **What are environment variables in CI/CD and how do you manage secrets?**
312. **What is the purpose of automated testing in a CI/CD pipeline?**
313. **What is a deployment rollback and how does it work?**
314. **What is the difference between blue-green deployment and canary deployment?**
315. **How would you set up automatic deployment to a server when code is pushed to the main branch?**

---

## AWS (Questions 316-330)

316. **What is AWS and what are its most commonly used services?**
317. **What is EC2 and how do you launch an instance?**
318. **What is S3 and what is it used for?**
319. **What is the difference between S3 and EBS?**
320. **What is AWS Lambda and what is serverless computing?**
321. **What is an IAM role and why is it important?**
322. **What is a VPC (Virtual Private Cloud)?**
323. **How would you deploy a Node.js application on AWS EC2?**
324. **What is Elastic Beanstalk and how is it different from EC2?**
325. **What is Route 53 and how does DNS work in AWS?**
326. **What is CloudFront and how does it improve performance?**
327. **What is RDS and when would you use it instead of MongoDB Atlas?**
328. **What is the AWS Free Tier and what services are included?**
329. **What is an Application Load Balancer (ALB)?**
330. **How would you set up a production MERN stack deployment on AWS?**

---

## Microsoft Azure (Questions 331-340)

331. **What is Microsoft Azure and how does it compare to AWS?**
332. **What is Azure App Service and how do you deploy a web app on it?**
333. **What is Azure Blob Storage and how is it similar to AWS S3?**
334. **What are Azure Functions and how do they compare to AWS Lambda?**
335. **What is Azure DevOps and how does it support CI/CD?**
336. **What is Azure Cosmos DB and when would you use it?**
337. **What is Azure Active Directory (Azure AD)?**
338. **How would you deploy a MERN application on Azure?**
339. **What is Azure Container Instances (ACI)?**
340. **What is the difference between Azure App Service and Azure Virtual Machines?**

---

## Nginx, Linux & General DevOps (Questions 341-350)

341. **What is Nginx and how is it used as a reverse proxy?**
342. **What is the difference between Nginx and Apache?**
343. **What is PM2 and why is it used with Node.js?**
344. **What basic Linux commands should a MERN developer know?**
345. **What is SSH and how do you connect to a remote server?**
346. **What is a domain name and how do you point it to your server?**
347. **What is SSL/TLS and how do you set up HTTPS for your application?**
348. **What is the difference between horizontal and vertical scaling?**
349. **What is a load balancer and why is it needed?**
350. **What is a microservices architecture and how is it different from monolithic?**

---

### DSA Questions -> 

For most **Indore service-based & mid-level companies** (Genesis, Impetus support roles, Yash, TCS, Infosys, Wipro, custom software firms, startups), the MOST repeated topics are:

* Arrays
* Strings
* Sorting
* Searching
* Basic Recursion
* Linked List basics
* Simple Stack/Queue
* Basic Matrix questions

Hard Graph/DP questions are comparatively rare in local fresher interviews. ([InterviewEra][1])

---

# 🚀 TOP 200 DSA QUESTIONS (INDORE COMPANY STYLE)

---

# 🟢 ARRAYS (1–60)

1. Find largest element in array
2. Find smallest element
3. Find second largest element
4. Reverse an array
5. Rotate array left
6. Rotate array right
7. Find missing number
8. Find duplicate number
9. Remove duplicates from array
10. Check if array is sorted
11. Merge two arrays
12. Merge sorted arrays
13. Bubble sort
14. Selection sort
15. Insertion sort
16. Linear search
17. Binary search
18. Find maximum difference
19. Find pair with given sum
20. Two Sum problem
21. Count even and odd numbers
22. Move zeroes to end
23. Move negative numbers to one side
24. Find frequency of elements
25. Find unique element
26. Find common elements in two arrays
27. Intersection of arrays
28. Union of arrays
29. Find largest subarray sum
30. Kadane’s Algorithm
31. Find minimum subarray sum
32. Find equilibrium index
33. Find leaders in array
34. Find majority element
35. Sort 0s and 1s
36. Sort 0s,1s,2s
37. Find peak element
38. Find first repeating element
39. Find first non-repeating element
40. Find array palindrome
41. Find average of array
42. Find median of array
43. Find kth largest element
44. Find kth smallest element
45. Reverse in groups
46. Count inversions
47. Rearrange positive-negative alternatively
48. Product of array except self
49. Maximum product subarray
50. Find subarray with given sum
51. Trapping rain water
52. Container with most water
53. Best time to buy and sell stock
54. Longest consecutive sequence
55. Spiral traversal of matrix
56. Matrix transpose
57. Matrix addition
58. Matrix multiplication
59. Search in matrix
60. Rotate matrix by 90 degree

---

# 🟢 STRINGS (61–110)

61. Reverse string
62. Check palindrome string
63. Count vowels
64. Count consonants
65. Count words in string
66. Remove spaces from string
67. Convert lowercase to uppercase
68. Convert uppercase to lowercase
69. Find duplicate characters
70. Find frequency of characters
71. Check anagram
72. Remove duplicate characters
73. Find first non-repeating character
74. Find first repeating character
75. Reverse words in sentence
76. Check substring
77. Find longest word
78. Find shortest word
79. String compression
80. Run length encoding
81. Count occurrence of substring
82. Replace spaces with special character
83. Remove vowels from string
84. Toggle characters
85. Check rotation of strings
86. Check valid shuffle
87. Sort characters in string
88. Remove special characters
89. Compare two strings without built-in function
90. Concatenate two strings manually
91. Find ASCII value of character
92. Find all permutations of string
93. Reverse each word
94. Longest palindrome substring
95. Longest common prefix
96. Check balanced parentheses
97. Remove brackets from algebraic expression
98. Roman number to integer
99. Integer to Roman
100. String to integer conversion
101. Integer to string conversion
102. Count digits in string
103. Count uppercase/lowercase letters
104. Remove consecutive duplicates
105. Find smallest character
106. Find largest character
107. Check pangram
108. Check isomorphic strings
109. Zigzag conversion
110. Generate all substrings

---

# 🟢 SORTING & SEARCHING (111–130)

111. Bubble sort
112. Selection sort
113. Insertion sort
114. Merge sort
115. Quick sort
116. Heap sort
117. Count sort
118. Radix sort
119. Binary search
120. Recursive binary search
121. Lower bound
122. Upper bound
123. Search insert position
124. Search in rotated sorted array
125. Find square root using binary search
126. Aggressive cows problem
127. Allocate minimum pages
128. Find peak element
129. Median of sorted arrays
130. Kth element of two sorted arrays


---

# 🎯 MOST IMPORTANT 40 (HIGH PRIORITY)

These are MOST repeated in service-based companies:

* Reverse String
* Palindrome
* Two Sum
* Binary Search
* Bubble Sort
* Largest Element
* Second Largest
* Frequency Count
* Missing Number
* Kadane Algorithm
* Merge Arrays
* Reverse Array
* Fibonacci
* Prime Number
* Anagram
* Remove Duplicates
* Valid Parentheses
* Reverse Linked List
* Detect Duplicate
* Matrix Traversal

([InterviewEra][1])

---

# 🚀 BEST STRATEGY FOR YOU

## Phase 1

Master:

* Arrays
* Strings
* Sorting
* Searching


---

# 💡 Reality of Indore Interviews

Most local companies ask:

* Easy → Medium coding
* Logic building
* Array/String manipulation
* Java basics + OOPs
* Small coding problems

([Reddit][2])

[1]: https://interviewera.com/blog/top-dsa-interview-questions?utm_source=chatgpt.com "Top DSA Interview Questions & Topic Map (2026) | InterviewEra"
[2]: https://www.reddit.com/r/embedded/comments/1rxz9jp/how_much_of_dsa_companies_ask_in_the_interviews/?utm_source=chatgpt.com "How much of DSA  companies ask in the interviews."



## Bonus Tips for Indore IT Companies

### Companies to Focus On:
- **Impetus Technologies** - Focus on React, Node.js, microservices
- **Accenture Indore** - Full stack, cloud integration, Agile
- **Infosys** - DSA, system design, MERN basics
- **TCS** - JavaScript fundamentals, problem solving
- **Persistent Systems** - Advanced React, performance optimization
- **Local Startups** - Real-world projects, hands-on coding

### Interview Preparation Tips:
1. Practice live coding on platforms like LeetCode, HackerRank
2. Build at least 2-3 full-stack MERN projects
3. Understand deployment (Heroku, AWS, Netlify, Vercel)
4. Know Git and version control well
5. Be ready to explain your project architecture
6. Practice explaining complex concepts simply
7. Focus on clean code and best practices
8. Understand security basics (XSS, CSRF, SQL injection prevention)
9. Know testing basics (Jest, React Testing Library)
10. Stay updated with latest React/Node.js versions

### Common Project Questions:
- Explain your project architecture
- What challenges did you face and how did you solve them?
- How did you optimize performance?
- How do you handle errors?
- What security measures did you implement?

---

## Resources for Further Study:

**JavaScript:**
- MDN Web Docs
- JavaScript.info
- You Don't Know JS (book series)

**React:**
- Official React Documentation
- React patterns
- Kent C. Dodds blog

**Node.js:**
- Official Node.js Docs
- Node.js Design Patterns

**MongoDB:**
- MongoDB University
- Official MongoDB Documentation

**Practice Platforms:**
- LeetCode
- HackerRank
- CodeWars
- Frontend Mentor (for React projects)

---

**Good luck with your interviews in Indore! 🚀**

*Remember: Understanding concepts is more important than memorizing answers. Be ready to explain your thought process and write code during interviews.*
