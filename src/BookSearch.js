import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookSearch extends Component {
    createBook = () => {
        let books = [];
        
        for (let index = 0; index < this.props.searchReasult.length; index++) {
          let book = this.props.searchReasult[index];
          books.push(
            <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})` }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => {
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
                  {
                    (book.authors) ? (
                      book.authors.map((author, index) => (
                        <div key={"author" + index.toString()} className="book-authors">{author}</div>
                      ))
                    ) : (
                        <div key={"author" + index.toString()} className="book-authors">unknown</div>
                    )}
              </div>
            </li>
          )
        }
        return books;
      }
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={this.props.onNavigate}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange= {(event) => {
                    console.log(event.target.value);
                    this.props.searchBooks(event.target.value)
                }}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.createBook()}
              </ol>
            </div>
          </div>
        );
    }
}

export default BookSearch;