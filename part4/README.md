# BlogListApp backend
1. Clone the root repository:
`git clone git@github.com:loredana-popa/fullstack_UHSK.git`

2. Pull all changes from gitHub (if the repository was cloned):
In the project directory run: `git pull`

3. Install dependencies for all aplication components (every folder that has a *package.json* file): 
`npm ci`

package.json paths:
*part4/package.json*
*part5/bloglist-frontend/package.json*

4. Store the secrets in a *.env* file:
```
 // MongDB connection
 // get the DB user password
MONGODB_URI=mongodb+srv://loredana:<password>@cluster0.oa1cb03.mongodb.net/blogListApp?retryWrites=true&w=majority
PORT=<port>

SECRET=<secretstring>`
```

5. Include the *.env* in a *.gitignore* and *.dockerignore* file

6. Run BlogApp backend in dev mode:
In the backend project directory *fullstack_UHSK/part4* run: `npm run dev`

7. Run BlogApp frontend in the dev mode:
In the frontend project directory *fullstack_UHSK/part5/bloglist-frontend* run: `npm start`

Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

**!! Make sure the frontend runs on the same PORT as the backend:**
    PORT def. for backend in *.env* file; `PORT=3001`
    PORT def. for frontend in *package.json* file; `"proxy": "http://localhost:3001",`


