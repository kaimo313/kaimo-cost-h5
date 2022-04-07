import React from 'react'

import { Button } from 'zarm';

export default function Index() {
  return <div>
    kaimo 的 index 页面

    <h3>
      按钮 Button 基本用法
    </h3>

    <Button>default</Button>
    <Button theme="primary">primary</Button>
  </div>
}