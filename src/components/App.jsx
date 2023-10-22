import '../styles/App.css'
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Quiz from "./Pages/Quiz.jsx";
import Result from "./Pages/Result.jsx";
import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext.jsx";
import PrivateOutlet from "./PrivateOutlet.jsx";
import PublicOutlet from "./PublicOutlet.jsx";
function App() {
  return (
      <AuthProvider>
          <Layout>
              <Routes>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path="/*" element={<PublicOutlet />}>
                      <Route path="signup" element={<Signup />}/>
                      <Route path="login" element={<Login />} />
                  </Route>
                  <Route path="/*" element={<PrivateOutlet />}>
                      <Route path="quiz/:id" element={<Quiz />}/>
                      <Route path="result/:id" element={<Result />} />
                  </Route>
              </Routes>
          </Layout>
      </AuthProvider>
  );
}

export default App;
