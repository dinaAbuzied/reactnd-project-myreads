import React, {Component} from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
            onNavigate= {
              () => {
                this.setState({ showSearchPage: true })
              }}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <BookSearch 
            onNavigate= {
              () => {
                this.setState({ showSearchPage: false })
              }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
