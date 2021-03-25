import React, { Component, Fragment } from 'react'
import { Button } from 'antd';
class Home extends Component {
  constructor() {
    super()
    this.sate = {}
  }

  render() {
    return (
      <Fragment>
        <Button type="primary">Home Button</Button>
      </Fragment>
    )
  }
}

export default Home