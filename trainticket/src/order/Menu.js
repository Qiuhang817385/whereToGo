import React, { memo } from 'react'
import './css/Menu.css'
import classnames from 'classnames';

const MenuItem = memo((props) => {
  const {
    onPress,
    title,
    value,
    active
  } = props;
  return <li className={classnames({ active })} onClick={() => { onPress(value) }}>
    {title}
  </li>
})

export default memo(function Menu (props) {
  const {
    // 是否展示
    show,
    // 菜单选项
    options,
    // 选中的回调
    onPress,
    // 点击其余区域,可以关闭,实现方式,遮罩层
    hideMenu
  } = props
  return (
    <div>
      {/* 只有show的时候才显示,这个OK, */}
      {show &&
        <div className="menu-mask" onClick={() => { hideMenu() }}></div>
      }
      <div className={classnames('menu', { show })}>
        <div className="menu-title"></div>
        <ul>
          {
            options &&
            options.map(option => {
              return <MenuItem key={option.value} {...option} onPress={onPress} />
            })
          }
        </ul>
      </div>

    </div>
  )
})
