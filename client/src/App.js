// Imported Pages
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Signup from "./pages/Signup";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// Importing Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: `/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/searchresults" element={<SearchResults />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;