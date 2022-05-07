import { useState, useCallback } from 'react'
import { Cell, Input, Button, Toast } from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import Captcha from "react-captcha-code"
import classNames from "classNames"
import { login, register } from "./api/index"
import { useNavigate } from 'react-router-dom';

import s from './style.module.less'

const Login = () => {
  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码
  const [verify, setVerify] = useState(''); // 验证码
  const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
  const [type, setType] = useState('login'); // 登录注册类型
  const navigate = useNavigate()

  // 验证码变化，回调方法
  const handleChange = useCallback((captcha) => {
    console.log('验证码变化，回调方法', captcha)
    setCaptcha(captcha)
  }, []);

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    try {
      // 判断是否是登录状态
      if (type == 'login') {
        // 执行登录接口，获取 token
        const { status, desc, data } = await login({
          username,
          password
        });
        console.log('登录接口', status, data)
        if(status === 200) {
          // 将 token 写入 localStorage
          localStorage.setItem('token', data.token);
          Toast.show('登录成功');
          navigate('/');
        } else {
          Toast.show(desc);
        }
      } else {
        if (!verify) {
          Toast.show('请输入验证码')
          return
        };
        if (verify != captcha) {
          Toast.show('验证码错误')
          return
        };
        const { status, desc, data } = await register({
          username,
          password
        });
        console.log('注册接口', status, data)
        if(status === 200) {
          Toast.show('注册成功');
          // 注册成功，自动将 tab 切换到 login 状态
          setType('login');
        } else {
          Toast.show(desc);
        }
      }
    } catch (error) {
      Toast.show('系统错误');
    }
  };

  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={classNames({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={classNames({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="user" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="password" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        type == 'register' ? <Cell icon={<CustomIcon type="captcha" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value) => setVerify(value)}
          />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell> : null
      }
    </div>
    <div className={s.operation}>
      <Button block theme="primary" onClick={onSubmit}>{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login