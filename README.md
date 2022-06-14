# React Maps - frontend
## Setup guide
1. Clone repository
2. Run "npm install"
3. Edit /src/config.json with your backend url (optional)
## Additional info
Heroku backend suffers from a cold start, so on first route search make sure to wait a few seconds extra. Decided to use Vite instead of Webpack (here why: https://vitejs.dev/guide/why.html). <del>Also refreshing website hosted on vercel causes 404 error. It's not the case on localhost or other hosts. I'm sure it's vercel only issue.</del> Fixed by editing vercel.json.
<br /><br />
<img src="https://i.imgur.com/PlvplFl.png"></img>
