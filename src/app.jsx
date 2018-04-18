import React from 'react'
import Wreck from 'wreck'
import {
  Card,
  Row,
  Col,
  Layout,
  Menu
} from 'antd'

const {
  Header,
  Content
} = Layout

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
      <Layout className='layout'>
        <Header>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='1'>MyMovies</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24 }}>
            <Row gutter={16}>
              {
                movies.map(({
                  title,
                  tmdb_image_url,
                  slug
                }) => (
                  <Col
                    span={6}
                    key={slug}
                  >
                    <Card

                      title={title} extra={<a href={slug}>View</a>}>
                      <img src={`${tmdbHost}${tmdb_image_url}`} />
                    </Card>
                  </Col>
                ))
              }
            </Row>
          </div>
        </Content>
      </Layout>
    )
  }
}
