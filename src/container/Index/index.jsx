import React from 'react'

import { Button } from 'zarm';

import k from './style.module.less'

console.log('style.module.less', k)

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
  </div>
}