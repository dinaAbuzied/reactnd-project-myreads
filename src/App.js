import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchReasult: [],
    query: ""
  }

  componentDidMount = () => {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      console.log("updated");
      this.getAllBooks();
    })
  }

  searchBooks = (query) => {
    if(query === ""){
      this.setState({searchReasult: [], query: ""});
    }
    else {
      this.setState({query});
      BooksAPI.search(query).then((searchReasult) => {
        if (Array.isArray(searchReasult) && this.state.query !== ""){
          let books = this.state.books;
          for (let index = 0; index < searchReasult.length; index++) {
            let book = searchReasult[index];
            let filteredBooks = books.filter(savedBook => book.id === savedBook.id);
            if(filteredBooks.length > 0)
            book.shelf = filteredBooks[0].shelf;
          }
          console.log(searchReasult);
          this.setState({searchReasult});
        }
        else {
          this.setState({searchReasult: []});
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves books = {this.state.books}
            onNavigate = {
              () => {
                this.setState({ showSearchPage: true })
              }}
            updateBook = {this.updateBook}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <BookSearch updateBook = {this.updateBook}
            onNavigate= {
              () => {
                this.setState({ showSearchPage: false })
              }}
            searchBooks = {this.searchBooks} 
            searchReasult = {this.state.searchReasult}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
