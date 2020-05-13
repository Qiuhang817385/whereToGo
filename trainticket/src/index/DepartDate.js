import React, { useMemo } from 'react'
import './css/DepartDate.css'
import { h0 } from '../utils/utils';
import dayjs from 'dayjs';
/**
 * 出发日期
 */
export default function DepartDate (props) {
  const { time, onClick } = props;
  // 获取今天的时间,去除掉小时分钟秒的,departTime现在是默认的
  const h0OfDepart = h0(time);
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format('YYYY-MM-DD');
  }, [h0OfDepart])
  // 要不然每一次都会变化

  const isToday = h0OfDepart === h0();
  const week = new Date();
  const weekString = '周' + [
    '日', '一', '二', '三', '四', '五', '六'
  ][week.getDay(h0OfDepart)]
    + (isToday ? '(今天)' : '')

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString}
      <span className="depart-week">{weekString}</span>
    </div>
  )
}
