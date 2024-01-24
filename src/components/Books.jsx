/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRentBooksMutation } from "../api/booksApi";

export default function Books() {
  // const { isLoading } = useGetBooksQuery();
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.bookSlice);
  const { token } = useSelector((state) => state.userSlice);
  const [rentBook] = useRentBooksMutation();
  const [data, setData] = useState(books);

  const search = (e) => {
    setData(
      books.filter((books) =>
        books.title.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };

  const rent = async (e) => {
    let parameter = {
      id: e.target.id,
      token: token,
      body: { available: false },
    };
    let info = await rentBook(parameter);
    console.log(info.data.book);
    setData(
      books.map((book) => {
        if (book.id === info.data.book.id) {
          console.log(info.data.book);
          return info.data.book;
        }
        return book;
      })
    );
  };
  console.log(data);
  return (
    <>
      <div>
        <h2>Books</h2>
        <input type="text" onChange={search}></input>
        <div className="books">
          {data.length ? (
            data.map((books) => {
              return (
                <div key={books.id} className="card">
                  <h1
                    onClick={() => {
                      navigate(`/books/${books.id}`);
                    }}
                  >
                    <p style={{ margin: "5px" }}>{books.title}</p>
                  </h1>
                  <img
                    className="image"
                    src={books.coverimage}
                    alt={books.title}
                    onClick={() => {
                      navigate(`/books/${books.id}`);
                    }}
                  />
                  <div
                    onClick={() => {
                      navigate(`/books/${books.id}`);
                    }}
                  >
                    <b>{books.author}</b>
                    <br />
                    <small>{books.description}</small>
                  </div>
                  <p>
                    {token && books.available && (
                      <button id={books.id} onClick={rent}>
                        Rent
                      </button>
                    )}
                  </p>
                </div>
              );
            })
          ) : (
            <>No results</>
          )}
        </div>
      </div>
    </>
  );
}
