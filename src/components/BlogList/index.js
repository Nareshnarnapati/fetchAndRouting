// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {blogsData: [], isLoader: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updateData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: updateData, isLoader: false})
  }

  render() {
    const {blogsData, isLoader} = this.state
    return (
      <div className="blogs-list-container">
        {isLoader ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bbff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlogItem => (
              <BlogItem key={eachBlogItem.id} blogItemDetails={eachBlogItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default BlogList
