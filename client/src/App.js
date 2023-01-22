// Imported Pages
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import SearchResults from "./pages/SearchResults";
import Signup from "./pages/Signup";
import CreatePfp from "./pages/CreatePfp";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// Importing Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddPost from "./pages/AddPost";

const httpLink = createHttpLink({
  uri: `http://localhost:3001/graphql`,
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
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/error" element={<Error />} />
          <Route path="/addpfp" element={<CreatePfp />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
