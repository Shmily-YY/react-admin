import React, { Component } from 'react'
// css
import './index.scss'

import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// 验证
import { validate_password } from '../../utils/validate'
// API
import { Login } from '../../api/account'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    Login().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  };
  toggleForm = () => {
    this.props.switchForm('register')
  }
  render() {
    return (
      <div>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggleForm}>注册</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '邮箱不能为空' },
                { type: "email", message: "邮箱格式不正确" }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '密码不能为空' },
                // { min: 6, message: "不能小于6位" },
                // { max: 20, message: "不能大于20位" },
                // { pattern: '/^[0-9]*$/', message: "请输入数字" },
                // ({ getFieldValue }) => ({
                //   validator(rule, value) {
                //     if (value.length < 6) {
                //       return Promise.reject(new Error('不能小于6位'));
                //     } else {
                //       return Promise.resolve();
                //     }

                //   },
                // })
                { pattern: validate_password, message: "请输入大于6位小于20位数字+字母" },
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入大于6位小于20位数字+字母" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: '验证码不能为空' },
                { len: 6, message: '请输入长度为6位的验证码' },
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                </Col>
                <Col span={9}>
                  <Button type="danger" block>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                登录
        </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

    )
  }
}

export default LoginForm