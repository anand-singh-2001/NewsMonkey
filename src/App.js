import "./App.css";
import Navbar from "./Components/Navbar";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";
import News from "./Components/News";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API; //value can be fetched from .env.local using this syntax.

  // state = {
  //   progress: 0
  // }
  const [progress, setProgress] = useState(0);

  // const setProgress = (progress) => {
  //   setState({ progress: progress })
  // }

  return (
    <div>
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
        // onLoaderFinished={() => setProgress (0)}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="general"
              pageSize={5}
              category="general"
              country="us"
            />
          }></Route>
        <Route
          exact
          path="/sports"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="sports"
              pageSize={5}
              category="sports"
              country="us"
            />
          }></Route>
        <Route
          exact
          path="/business"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="business"
              pageSize={5}
              category="business"
              country="us"
            />
          }></Route>
        <Route
          exact
          path="/health"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="health"
              pageSize={5}
              category="health"
              country="us"
            />
          }></Route>
        <Route
          exact
          path="/science"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="science"
              pageSize={5}
              category="science"
              country="us"
            />
          }></Route>
        <Route
          exact
          path="/technology"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="technology"
              pageSize={5}
              category="technology"
              country="us"
            />
          }></Route>
        <Route
          exact
          path="/entertainment"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="entertainment"
              pageSize={5}
              category="entertainment"
              country="us"
            />
          }></Route>
        z
      </Routes>
    </div>
  );
};
export default App;
