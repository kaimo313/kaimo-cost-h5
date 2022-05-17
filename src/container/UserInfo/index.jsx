import React, { useEffect, useState } from 'react';
import { Button, FilePicker, Input, Toast } from 'zarm';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { getAvatar, userInfo, uploadAvatar, updateUserInfo } from './api/index.js';
import defaultAvatar from "@/assets/images/default.jpg";

import s from './style.module.less';

const UserInfo = () => {
  const navigate = useNavigate();; // 路由实例
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar); // 头像显示路径
  const [avatar, setAvatar] = useState(''); // 头像
  const [signature, setSignature] = useState(''); // 个签

  useEffect(() => {
    getUserInfo(); // 初始化请求
  }, []);

  useEffect(async () => {
    if(avatar) {
      // 获取头像
      const { status, data, desc } = await getAvatar({picname: avatar});
      if(status === 200) {
        setAvatarUrl(data);
      }else{
        Toast.show(desc);
      }
    }
  }, [avatar]);

  // 获取用户信息
  const getUserInfo = async () => {
    const { status, desc, data } = await userInfo({});
    if(status === 200) {
      setAvatar(data.avatar)
      setSignature(data.signature)
    }else{
      Toast.show(desc);
    }
  };

  // 获取图片回调 
  const handleSelect = async (file) => {
    console.log('file.file', file.file)
    if (file && file.file.size > 200 * 1024) {
      Toast.show('上传头像不得超过 200 KB！')
      return
    }
    // 生成 form-data 数据类型
    let formData = new FormData()
    formData.append('file', file.file)
    // 通过 axios 传 forms 设置  'Content-Type': 'multipart/form-data', 进行文件上传
    const { status, desc, data } = await uploadAvatar({
      forms: formData
    });
    // 返回图片地址
    if(status === 200) {
      setAvatar(data)
    }else{
      Toast.show(desc);
    }
  }

  // 编辑用户信息方法
  const save = async () => {
    if (signature && signature.length > 36) {
      Toast.show('个性签名不能超过36个字！')
      return
    }
    const { status, desc } = await updateUserInfo({
      signature,
      avatar
    });
    if(status === 200) {
      Toast.show('修改成功')
      // 成功后回到个人中心页面
      navigate(-1)
    }else{
      Toast.show(desc);
    }
  }

  return <>
    <Header title='用户信息修改' />
    <div className={s.userinfo}>
      <div className={s.item}>
        <div className={s.title}>头像</div>
        <div className={s.avatar}>
          <img className={s.avatarUrl} src={avatarUrl} alt=""/>
          <div className={s.desc}>
            <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
            <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
              <Button className={s.upload} theme='primary' size='xs'>点击上传</Button>
            </FilePicker>
          </div>
        </div>
      </div>
      <div className={s.item}>
        <div className={s.title}>个性签名</div>
        <div className={s.signature}>
          <Input
            clearable
            type="text"
            value={signature}
            placeholder="个性签名不能超过36个字"
            onChange={(value) => setSignature(value)}
          />
        </div>
      </div>
      <Button onClick={save} style={{ marginTop: 50 }} block theme='primary'>保存</Button>
    </div>
  </>
};

export default UserInfo;