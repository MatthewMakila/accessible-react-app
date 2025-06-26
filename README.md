# ♿️ Accessible Games App

This project was built in a [React+Vite JS framework](https://vite.dev/guide/#scaffolding-your-first-vite-project) to be dynamic and screen-reader friendly. The project houses several games demonstrating challenges faced by individuals with particular disabilities online, using colorful animations to teach K-12 and university students about the importance of accessibility in design.
The app is hosted at [gooddesignforall.com](https://gooddesignforall.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/MatthewMakila/accessible-react-app.git
cd accessible-game
npm install
```

## 🔨 Running the Code

### Locally Run App
- Once the everything is properly installed/configured, run the following and visit the provided localhost link to view!

```bash
npm run dev
```

### (Optional) Host App
- If you would like to build the project to statically deploy it online via a server (e.g., FTP), run the following command to populate a dist folder with those build files:

```bash
npm run build
```

## 📝 Notes for Other Developers

- Most of what you'll need to edit will be within ```src/games/```
- If you need to add assets (e.g., images) you can add them to ```src/assets/```
- I'm using [react-bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction/) for most of the app's styling, but if you need to make edits to the global CSS, that's housed in ```index.css```
- You'll want to edit ```App.jsx``` to add or modify routes for the games you're working on. Your specific ```Game.jsx``` and ```Round.jsx``` will utilize this routing information
- ```Game.jsx```, ```Round.jsx```, and any other related files you use for a specific game might require edits to the UI and game mechanics: ```return``` and ```useEffect``` will be useful areas of the code to make these edits, respectively. 