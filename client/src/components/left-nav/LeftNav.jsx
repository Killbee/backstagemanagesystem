import React, { Component } from "react";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions.js";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuConfig";
import "./leftNav.less";
const { SubMenu } = Menu;
class LeftNav extends Component {
  /*
    判断当前用户是否对menuList中的item有对应权限
  */
  hasAuth = (item) => {
    const { key, isPublic } = item;
    const { username } = this.props.user;
    const menus = this.props.user.role.menus;
    if (username === "admin" || isPublic || menus.includes(key)) {
      return true;
    } else if (item.children) {
      // 当前用户有此item的孩子权限，显示item和item孩子菜单项
      return !!item.children.find((child) => menus.includes(child.key));
    }
    return false;
  };

  handleClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key);
  };
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname.replace(
      /^\/product[\D]+/,
      "/product"
    );
    return menuList.map((item) => {
      // 做一些判断，判断当前item所对应的菜单项，当前用户是否具有权限访问，如果没有，则不显示，动态设置权限问题
      if (this.hasAuth(item)) {
        if (!item.children) {
          if (item.key === path) {
            this.props.setHeadTitle(item.title);
          }
          return (
            <Menu.Item
              key={item.key}
              onClick={() => this.props.setHeadTitle(item.title)}
            >
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Menu.Item>
          );
        } else {
          if (
            item.children.find((cItem) => {
              return cItem.key === path;
            })
          ) {
            this.openKey = item.key;
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      } else {
        return null;
      }
    });
  };
  componentWillMount() {
    this.menu = this.getMenuNodes(menuList);
    console.log(this.menu);
  }
  render() {
    console.log("leftNav--render");
    const path = this.props.location.pathname.replace(
      /^\/product[\D]+/,
      "/product"
    );
    return (
      <div className="left-nav">
        <Link to="/user" className="left-nav-header">
          <img src="/images/logo.png" alt="" />
          <h1>后台管理</h1>
        </Link>
        <Menu
          mode="inline"
          //theme="dark"
          onClick={this.handleClick}
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
        >
          {this.menu}
        </Menu>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setHeadTitle })(
  withRouter(LeftNav)
);
