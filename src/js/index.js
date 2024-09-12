//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";


// include your styles into the webpack bundle
import "../styles/index.css";
const root = ReactDOM.createRoot(document.getElementById('app'));
//import your own components
// import GetData from "./component/api.jsx";
// import Home from "./component/api.jsx";

import TodoList from "./component/home.jsx";
//render your react application
root.render(<TodoList/>);

