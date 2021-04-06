import React, { Component } from 'react'
// css
import './index.scss'

import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// 验证
import { validate_password, validate_email } from '../../utils/validate'
// API
import { Login, GetCode } from '../../api/account'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "409019683@qq.com",
      code_button_disabled: false,
      code_button_loading: false,
      code_button_text: "获取验证码"
    }
    // react 没有数据双向绑定的概念
  }
  // 登录
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    Login().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  };
  // 获取验证码
  getCode = () => {
    this.setState({
      code_button_loading: true,
      code_button_text: "发送中"
    })
    if (!this.state.username) {
      message.warning('用户名不能为空！！！', 2);
      return false
    }
    const reqObj = {
      username: this.state.username,
      module: "login"
    }
    GetCode(reqObj).then(res => {
      // 执行倒计时
      console.log(res)
      this.setState({
        code_button_loading: false
      })
      this.countDown()
    }).catch(err => {
      this.setState({
        code_button_loading: false,
        code_button_text: "重新获取"
      })
    })
  }
  /**倒计时 */
  countDown = () => {
    let timer = null
    let sec = 60
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sec}s`
    })
    /**定时器 */
    timer = setInterval(() => {
      sec--
      if (sec <= 0) {
        this.setState({
          code_button_text: "重新获取",
          code_button_disabled: false,
        })
        clearInterval(timer)
        return false
      }
      this.setState({
        code_button_text: `${sec}s`
      })
    }, 1000);

  }
  inputChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  toggleForm = () => {
    this.props.switchForm('register')
  }
  render() {
    const { username, code_button_disabled, code_button_loading, code_button_text } = this.state
    const _this = this
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
                // { type: "email", message: "邮箱格式不正确" }
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    console.log("11111111", validate_email(value))
                    if (validate_email(value)) {
                      _this.setState({
                        code_button_disabled: false
                      })
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('邮箱格式不正确！'));
                  },
                })
              ]}
            >
              <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
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
                  <Button loading={code_button_loading} disabled={code_button_disabled} type="danger" block onClick={this.getCode}>{code_button_text}</Button>
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