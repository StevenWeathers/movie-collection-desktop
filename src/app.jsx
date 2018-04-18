import React from 'react'
import Wreck from 'wreck'

const tmdbHost = 'http://image.tmdb.org/t/p/w154'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      isLoading: true
    }
  }

  componentDidMount () {
    this.getMovies()
  }

  async getMovies () {
    try {
      const { payload } = await Wreck.get('http://192.168.1.201:8080/movies')
      const movies = JSON.parse(payload.toString())

      this.setState({
        isLoading: false,
        movies
      })
    } catch (e) {
      console.log('error >>> ', e)
    }
  }

  render () {
    const {
      movies
    } = this.state

    return (
      <div>
        {
          movies.map(({
            title,
            tmdb_image_url,
            slug
          }) => (
            <div
              key={slug}
            >
              {title} <br />
              <img src={`${tmdbHost}${tmdb_image_url}`} />
            </div>
          ))
        }
      </div>
    )
  }
}
