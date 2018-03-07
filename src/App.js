import React, { Component } from 'react'
import 'bootstrap-css-only'
import NewComment from './NewComment'
import Comments from './Comments'


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      comments: {},
      isLoggedIn: false,
      user: {}
    }
    this.postNewComment = this.postNewComment.bind(this)

    this.refComments = this.props.base.syncState('comments', {
      context: this,
      state: 'comments'
    })

    this.props.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true, user})
      } else {
        this.setState({isLoggedIn: false, user: {}})
      }
    })
  }

  postNewComment (comment) {
    comment.user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName
    }
    const comments = {...this.state.comments}
    const timestamp = Date.now()
    comments[`comm-${timestamp}`] = comment
    this.setState({
      comments: comments
    })
  }

  auth (provider) {
    let prov = this.props.providers[provider]
    prov.addScope('user_birthday')
    this.props.auth.signInWithPopup(prov)
  }

  render () {
    return (
      <div className='container'>
        { this.state.isLoggedIn &&
          <div>
            {this.state.user.displayName}
            <img src={this.state.user.photoURL} />
            <button onClick={() => this.props.auth.signOut()}>Deslogar</button>
            <NewComment postNewComment={this.postNewComment} alt={this.state.user.displayName} />
          </div>
        }
        { !this.state.isLoggedIn && <div className='alert alert-info'><button onClick={() => this.auth('facebook')}>Entre com o Facebook para comentar</button></div>}
        <Comments comments={this.state.comments} />
      </div>
    )
  }
}

export default App
