import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";
// import { dark } from "@clerk/themes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Dashboard</Link>
          <SignedIn>{/*will be showcased when user is signded in */}
          {/* can also use the user button component, it shows the user button of the user in the page */}
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
           {/*elements in here will basically define that on clicking a certain element, where will the link go to
          take for example when we open a wabpage, in the topmost tab, we see/file/project something, so it defines that */}
          {/* main landing page will show Dashboard in big font */}
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                {/* an extension of /auth will show Sign in on the page */}
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;