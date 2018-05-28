import Icon from "antd-mobile/lib/icon"
import "antd-mobile/lib/icon/style/css"
import NavBar from "antd-mobile/lib/nav-bar"
import 'antd-mobile/lib/nav-bar/style/css'
import React, { Fragment, PureComponent } from 'react'
import './head/index.css'


class PageHeader extends PureComponent {
  public render() {
    return (
      <Fragment>
        <NavBar
          mode="light"
          icon={<Icon type='left'/>}
        >
          聊天室
        </NavBar>
      </Fragment>
    )
  }
}

export default PageHeader
