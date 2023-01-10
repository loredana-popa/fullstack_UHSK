# BlogListApp backend
Clone the repository:
`git clone`

Pull all changes from gitHub: 
`git pull`

Install dependencies for all aplication components (every folder that has package.json): 
`npm ci`

package.json paths:
*part4/package.json*
*part5/bloglist-frontend/package.json*

Run BlogApp backend in dev mode: path *fullstack_UHSK/part4*
`npm run dev`

Run BlogApp frontend : path *fullstack_UHSK/part5/bloglist-frontend*
`npm start`

!! Make sure the frontend runs on the same PORT as the backend:
    PORT def for backend in *.env* file; `PORT=3001`
    PORT def for frontend in *package.json* file; `"proxy": "http://localhost:3001",`


