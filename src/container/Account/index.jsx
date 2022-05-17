import React from 'react';
import { Cell, Input, Button, Toast } from 'zarm';
import { useNavigate } from 'react-router-dom';
import { createForm  } from 'rc-form';
import Header from '@/components/Header'
import { resetPassword } from './api/index'
import CryptoJS from "crypto-js";

import s from './style.module.less'

const Account = (props) => {
  const navigate = useNavigate();
  // Account 通过 createForm 高阶组件包裹之后，可以在 props 中获取到 form 属性
  console.log('Account 通过 createForm 高阶组件包裹之后', props)
  const { getFieldProps, validateFields } = props.form;

  // DES 加密
  const DES_encrypt = (hashStr) => {
    return CryptoJS.DES.encrypt(
      hashStr,
      CryptoJS.enc.Utf8.parse("ABF"),// keyHex
      { 
        mode: CryptoJS.mode.ECB, 
        padding: CryptoJS.pad.Pkcs7 
      } // option
    ).ciphertext.toString();
  }

  // 提交修改方法
  const submit = () => {
    // validateFields 获取表单属性元素
    validateFields(async (error, value) => {
      // error 表单验证全部通过，为 false，否则为 true
      if (!error) {
        console.log(value)
        if (value.newPassword != value.newPassword2) {
          Toast.show('新密码输入不一致');
          return
        }
        const {status, desc} = await resetPassword({
          oldPassword: DES_encrypt(value.oldPassword),
          newPassword: DES_encrypt(value.newPassword)
        })
        if(status === 200) {
          Toast.show('修改成功');
          // 退出登录跳转登录页
          localStorage.removeItem("token");
          navigate('/login')
        }else{
          Toast.show(desc)
        }
      }else{
        Toast.show('参数校验不通过，请填写完整！')
      }
    });
  }

  return <>
    <Header title="重制密码" />
    <div className={s.account}>
      <div className={s.form}>
        <Cell title="原密码">
          <Input
            clearable
            type="password"
            placeholder="请输入原密码"
            {...getFieldProps('oldPassword', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="password"
            placeholder="请输入新密码"
            {...getFieldProps('newPassword', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="password"
            placeholder="请确认新密码"
            {...getFieldProps('newPassword2', { rules: [{ required: true }] })}
          />
        </Cell>
      </div>
      <Button className={s.btn} block theme="primary" onClick={submit}>提交</Button>
    </div>
  </>
};

export default createForm()(Account);