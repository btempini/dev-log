// Imported Pages
import Feed from "./pages/Feed";
import Home from "./pages/Home";
// import Post from "./pages/Post";
// import Profile from "./pages/Profile";
// import SearchResults from "./pages/SearchResults"
import Signup from "./pages/Signup";

// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Importing Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    // <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
    // </ApolloProvider>
  );
}

export default App;
