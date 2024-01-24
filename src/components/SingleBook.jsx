/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../api/booksApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigations from "./Navigations";
import "../index.css";

export default function SingleBook() {
  const { id } = useParams(); //takes the parameter of id from the url
  const navigate = useNavigate();
  const { books, book } = useSelector((state) => state.bookSlice);
  let data = [];
  if (!books.length) {
    //if the user did not load directly from home page but loads from the single book page, there will be no data so we call api to fetch single books data
    useGetBookQuery(id);
    data.push(book);
  } else {
    data = books.filter((books) => books.id === Number(id)); // if there is data already loaded, filter the data out
  }

  //if there is data display the data otherwise display loading...
  return (
    <>
      <Navigations></Navigations>
      {data[0] ? (
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <div className="singleCard">
          <p>Book Id:{data[0].id}</p>
          <h2>{data[0].title}</h2>
          <p>Author: {data[0].author}</p>
          <img
            className="singleImage"
            src={data[0].coverimage}
            alt={data.title}
          />
          <p className="singleP">{data[0].description}</p>
        </div>
      </div>
      ) : (<>Loading...</>)}
    </>
  );
}
