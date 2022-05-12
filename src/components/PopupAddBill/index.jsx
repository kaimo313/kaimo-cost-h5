import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Popup, Icon, Keyboard, Input, Toast  } from 'zarm';
import CustomIcon from '@/components/CustomIcon'
import PopupDate from '../PopupDate'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { queryTypeList, billAdd, billUpdate } from './api/index.js'
import { typeMap } from '@/utils';
import cx from 'classnames';

import s from './style.module.less';

const PopupAddBill = forwardRef(({ detail = {}, onReload }, ref) => {
  const dateRef = useRef();
  const id = detail && detail.id // 外部传进来的账单详情 id
  const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
  const [date, setDate] = useState(new Date()); // 日期
  const [payType, setPayType] = useState('expense'); // 支出或收入类型
  const [currentType, setCurrentType] = useState({}); // 当前选中账单类型
  const [amount, setAmount] = useState(''); // 账单金额
  const [expense, setExpense] = useState([]); // 支出类型数组
  const [income, setIncome] = useState([]); // 收入类型数组
  const [remark, setRemark] = useState(''); // 备注
  const [showRemark, setShowRemark] = useState(false); // 备注输入框

  // 详情信息回显
  useEffect(() => {
    if (detail.id) {
      setPayType(detail.pay_type == 1 ? 'expense' : 'income')
      setCurrentType({
        id: detail.type_id,
        name: detail.type_name
      })
      setRemark(detail.remark)
      setAmount(detail.amount)
      setDate(detail.date)
    }
  }, [detail])

  // 通过 forwardRef 拿到外部传入的 ref，并添加属性，使得父组件可以通过 ref 控制子组件。
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      }
    }
  };

  useEffect(async () => {
    const { data } = await queryTypeList({});
    const _expense = data.filter(i => i.type == 1); // 支出类型
    const _income = data.filter(i => i.type == 2); // 收入类型
    setExpense(_expense);
    setIncome(_income);
    // 没有 id 的情况下，说明是新建账单。
    if(!id) {
      setCurrentType(_expense[0]); // 新建账单，类型默认是支出类型数组的第一项
    }
  }, [])

  // 切换收入还是支出
  const changeType = (type) => {
    setPayType(type);
    type == 'expense' ? setCurrentType(expense[0]) : setCurrentType(income[0]);
  };

  // 日期选择回调
  const selectDate = (val) => {
    console.log('日期选择回调', val)
    setDate(val);
  }

  // 监听输入框改变值
  const handleMoney = (value) => {
    console.log('value', value)
    value = String(value)
    // 点击关闭的时候
    if(value == 'close') {
      setShow(false)
      return
    }
    // 点击是删除按钮时
    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount)
      return
    }
    // 点击确认按钮时，调用新增账单接口
    if (value == 'ok') {
      addBill()
      return
    }
    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (value == '.' && amount.includes('.')) return
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    // amount += value
    setAmount(amount + value)
  }

  // 添加账单
  const addBill = async () => {
    if (!amount) {
      Toast.show('请输入具体金额')
      return
    }
    const params = {
      amount: Number(amount).toFixed(2),
      type_id: currentType.id,
      type_name: currentType.name,
      date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      pay_type: payType == 'expense' ? 1 : 2,
      remark: remark || ''
    }
    // 如果有id，调用编辑账单，没有就新增账单
    if(id) {
      const { status, desc, data } = await billUpdate({
        id, ...params
      });
      console.log('编辑账单', status, desc, data);
      if(status === 200) {
        Toast.show('编辑成功');
      }else{
        Toast.show(desc);
        return ;
      }
    }else{
      const { status, desc, data } = await billAdd(params);
      console.log('新增账单', status, desc, data);
      if(status === 200) {
        Toast.show('新增成功');
      }else{
        Toast.show(desc);
        return ;
      }
      // 重置参数
      setAmount('');
      setPayType('expense');
      setCurrentType(expense[0]);
      setDate(new Date());
      setRemark('');
      Toast.show('添加成功');
    }
    setShow(false);
    // 刷新数据
    if (onReload) onReload();
  }

  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className={s.addWrap}>
      {/* 右上角关闭弹窗 */}
      <header className={s.header}>
        <span className={s.close} onClick={() => setShow(false)}><Icon type="wrong" /></span>
      </header>
      {/* 「收入」和「支出」类型切换 */}
      <div className={s.filter}>
        <div className={s.type}>
          <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}>支出</span>
          <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>收入</span>
        </div>
        <div
          className={s.time}
          onClick={() => dateRef.current && dateRef.current.show()}
        >{dayjs(date).format('YYYY-MM-DD HH:mm')} <Icon className={s.arrow} type="arrow-bottom" /></div>
      </div>
      <div className={s.money}>
        <span className={s.sufix}>¥</span>
        <span className={cx(s.amount, s.animation)}>{amount}</span>
      </div>
      <div className={s.typeWarp}>
        <div className={s.typeBody}>
          {/* 通过 payType 判断，是展示收入账单类型，还是支出账单类型 */}
          {
            (payType == 'expense' ? expense : income).map(item => <div onClick={() => setCurrentType(item)} key={item.id} className={s.typeItem}>
              {/* 收入和支出的字体颜色，以及背景颜色通过 payType 区分，并且设置高亮 */}
              <span className={cx({[s.iconfontWrap]: true, [s.expense]: payType == 'expense', [s.income]: payType == 'income', [s.active]: currentType.id == item.id})}>                
                <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
              </span>
              <span>{item.name}</span>
            </div>)
          }
        </div>
      </div>
      <div className={s.remark}>
        {
          showRemark ? <Input
            autoHeight
            showLength
            maxLength={50}
            type="text"
            rows={3}
            value={remark}
            placeholder="请输入备注信息"
            onChange={(val) => setRemark(val)}
            onBlur={() => setShowRemark(false)}
          /> : <span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>
        }
      </div>
      <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
      <PopupDate ref={dateRef} mode="datetime" onSelect={selectDate} />
    </div>
  </Popup>
})

PopupAddBill.propTypes = {
  detail: PropTypes.object,
  onReload: PropTypes.func
}

export default PopupAddBill