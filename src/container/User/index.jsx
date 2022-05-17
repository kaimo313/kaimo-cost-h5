import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Button, Toast } from 'zarm';
import { userInfo, getAvatar } from './api/index.js';
// 引入图片
import geqian from "@/assets/images/geqian.png";
import gxqm from "@/assets/images/gxqm.png";
import zhaq from "@/assets/images/zhaq.png";
import lianxi from "@/assets/images/lianxi.png";
import defaultAvatar from "@/assets/images/default.jpg";

import s from './style.module.less';

const User = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar); // 头像显示路径
  const [user, setUser] = useState({});
  
  useEffect(() => {
    getUserInfo();
  }, []);

  // 获取用户信息
  const getUserInfo = async () => {
    const { status, desc, data } = await userInfo({});
    if(status === 200) {
      setUser(data);
      // 获取头像
      if(data.avatar) {
        const res = await getAvatar({picname: data.avatar});
        console.log(res);
        if(res.status === 200) {
          setAvatarUrl(res.data);
        }else{
          Toast.show(res.desc);
        }
      }
    }else{
      Toast.show(desc);
    }
  };

  // 退出登录
  const logout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return <div className={s.user}>
    <div className={s.head}>
      <div className={s.info}>
        <span>昵称：{user.username || '--'}</span>
        <span>
          <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src={geqian} alt="" />
          <b>{user.signature || '这个人很懒，暂无个签'}</b>
        </span>
      </div>
      <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={avatarUrl} alt="" />
   </div>
   <div className={s.content}>
    <Cell
      hasArrow
      title="用户信息修改"
      onClick={() => navigate('/userinfo')}
      icon={<img style={{ width: 20, verticalAlign: '-7px' }} src={gxqm} alt="" />}
    />
    <Cell
      hasArrow
      title="重制密码"
      onClick={() => navigate('/account')}
      icon={<img style={{ width: 20, verticalAlign: '-7px' }} src={zhaq} alt="" />}
    />
    <Cell
      hasArrow
      title="关于我们"
      onClick={() => navigate('/about')}
      icon={<img style={{ width: 20, verticalAlign: '-7px' }} src={lianxi} alt="" />}
    />
   </div>
   <Button className={s.logout} block theme="danger" onClick={logout}>退出登录</Button>
  </div>
}

export default User