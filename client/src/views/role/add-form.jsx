import React, { Component } from "react";
import { Form, Input } from "antd";
import propTypes from "prop-types";
const Item = Form.Item;
class AddForm extends Component {
  static propTypes = {
    getForm: propTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item label="添加角色" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "角色名称必须输入" }],
          })(<Input placeholder="请输入角色名称"></Input>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
