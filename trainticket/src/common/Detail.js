import React, { memo, useMemo } from 'react'
import './css/Detail.css'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const format = (d) => {
  return dayjs(d).format('MM-DD') + ' ' + dayjs(d).locale('zh-cn').format('ddd')
}

export default memo(function Detail (props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    trainNumber,
    departStation,
    arriveStation,
    durationStr,
    // doToggleIsScheduleVisible
  } = props
  // console.log('departStation', departStation)
  const departDateStr = useMemo(() => format(departDate), [departDate])
  const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);

  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{departStation}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{departDateStr}</p>
        </div>
        <div className="middle">
          <p className="train-name">{trainNumber}</p>
          <p className="train-mid">
            {props.children}
          </p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{arriveDateStr}</p>
        </div>
      </div>
    </div>
  )
})
