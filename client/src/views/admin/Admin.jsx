import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd'
import Header from '../../components/header/Header'
import LeftNav from '../../components/left-nav/LeftNav'
import Category from '../../views/category/Category'
import User from '../../views/user/User'
import Product from '../../views/product/Product'
import Role from '../../views/role/Role'
import NotFound from '../not-found/NotFound'
const { Footer, Sider, Content } = Layout
class Admin extends Component {
  render() {
    if (!this.props.user._id || !this.props.user.username) {
      // 没有登录，内存中无user数据
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider><LeftNav/></Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor: '#fff', margin: '15px'}}>
            <Switch>
              <Redirect exact from='/' to='/product'></Redirect>
              <Route path='/user' exact component={User}></Route>
              <Route path='/role' exact component={Role}></Route>
              <Route path='/product'  component={Product}></Route>
              <Route path='/category' exact component={Category}></Route>
              <Route component={NotFound}></Route>  
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: 'rgba(204, 204, 204, 1)'}}></Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({user: state.user})
)(Admin)