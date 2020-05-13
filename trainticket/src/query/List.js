import React, { memo, useMemo } from 'react'
import './css/List.css'
import URI from 'urijs';
import dayjs from 'dayjs';
const ListItem = memo(function (props) {
  const {
    // 离开时间
    dTime,
    // 到达时间
    aTime,
    // 离开地点
    dStation,
    // 到达地点
    aStation,
    // 车次
    trainNumber,
    dates,
    time,
    priceMsg,
    dayAfter } = props;
  console.log('dates', dayjs(dates).format('YYYY-MM-DD'))
  const url = useMemo(() => {

    return new URI('ticket.html')
      .setSearch('aStation', aStation)
      .setSearch('dStation', dStation)
      .setSearch('trainNumber', trainNumber)
      .setSearch('dates', dayjs(dates).format('YYYY-MM-DD'))
      .toString();
  }, [
    aStation,
    dStation,
    trainNumber,
    dates,
  ]);
  return (
    <li className="list-item">
      <a href={url}>
        <span className="item-time">
          <em>{dTime}</em>
          <br />
          <em className="em-light">{aTime} <i className="time-after">{dayAfter}</i></em>
        </span>
        <span className="item-stations">
          <em>
            <i className="train-station train-start">始</i>
            {dStation}
          </em>
          <br />
          <em className="em-light">
            <i className="train-station train-end">终</i>
            {aStation}
          </em>
        </span>
        <span className="item-train">
          <em>{trainNumber}</em>
          <br />
          <em className="em-light">{time}</em>
        </span>
        <span className="item-ticket">
          <em>{priceMsg}</em>
          <br />
          <em className="em-light-orange">可抢票</em>
        </span>
      </a>
    </li>
  )
})
export default memo(function List (props) {
  const { list, date } = props
  return (
    <ul className="list">
      {
        list.map(item => <ListItem dates={date} {...item} key={item.trainNumber} />)
      }
    </ul>
  )
})
