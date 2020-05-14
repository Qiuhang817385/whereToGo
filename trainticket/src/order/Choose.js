import React, { memo } from 'react'
import './css/Choose.css'
import classnames from 'classnames';
export default memo(function Choose (props) {
  const { passengers,
    updatePassenger, } = props

  function createSeat (seatType) {
    return (
      <div>
        {/* 使用内部函数来直接创建jsx,是有性能问题的,这是为什么,可以自己优化一下 */}
        {passengers.map(passenger =>
          (<p
            // 怎么激活,直接调actionCreator
            onClick={() => {
              updatePassenger(passenger.id, {
                seat: seatType
              })
            }}
            data-text={seatType}
            key={passenger.id}
            className={classnames('seat', { active: passenger.seat === seatType })}>
            &#xe02d;
          </p>))
        }
      </div>
    )
  }

  return (
    <div className="choose">
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {/* {createSeat('C')} */}
          <div>过道</div>
          {createSeat('D')}
          {/* {createSeat('F')} */}
          <div>窗</div>
        </div>
      </div>
    </div>
  )
})
