import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookShelves extends Component {
    createBook = (shelf) => {
      let books = [];
      let filteredBooks = this.props.books.filter(book => book.shelf === shelf);
      
      for (let index = 0; index < filteredBooks.length; index++) {
        let book = filteredBooks[index];
        books.push(
          <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => {
                        book.shelf = event.target.value;
                        this.props.updateBook(book, event.target.value);
                      }}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author, index) => (
                  <div key={"author" + index.toString()} className="book-authors">{author}</div>
                ))}
            </div>
          </li>
        )
      }
      return books;
    }

    render(){
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.createBook('currentlyReading')}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.createBook('wantToRead')}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.createBook('read')}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" onClick={this.props.onNavigate}>Add a book</Link>
              </div>
            </div>
          )
    }
}

export default BookShelves