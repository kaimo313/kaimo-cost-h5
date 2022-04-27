import React from 'react'

import { Button, Toast } from 'zarm';

import k from './style.module.less'

console.log('style.module.less', k)

import { login } from "./api/index.js";

const onSubmit = async () => {
  try {
    const data = await login({
      username: "kaimo313",
      password: "123456"
    });
    console.log(data);
    Toast.show('登录成功');
  } catch (error) {
    console.log(error)
    Toast.show('系统错误');
  }
};

export default function Index() {
  return <div className={k.kaimoIndex}>
    kaimo 的 index 页面

    <h3>
      按钮 Button 基本用法
    </h3>

    <Button>default</Button>
    <Button theme="primary">primary</Button>

    <h3 className={k.noremKaimo}>
      按钮 Button 基本用法 norem
    </h3>

    <Button onClick={onSubmit} block theme="primary">登录</Button>
  </div>
}