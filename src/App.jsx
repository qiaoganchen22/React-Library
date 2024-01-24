import { useState } from "react";
import Books from "./components/Books";
import { useGetBooksQuery } from "./api/booksApi";
import Navigations from "./components/Navigations";


function App() {
  const [token, setToken] = useState(null);
  const { isLoading } = useGetBooksQuery(); //load the books api 
  return ( 
    <>
      <Navigations></Navigations>
      {/* if books api is still loading data display loading otherwise display the Books component */}
      {(!isLoading && <Books></Books>) || <>Loading...</>}
    </>
  );
}

export default App;
