import React from 'react';
import './css/DateSelector.css';
import classnames from 'classnames';
import Header from './Header';
import { h0 } from './../utils/utils';
function Day (props) {
  const { day, onSelect } = props

  // 判断底层组件状态
  if (!day) return <td className="null"></td>
  const classes = [];
  const now = h0();
  // 如果是过去，disabled
  if (day < now) classes.push('disabled');
  if ([6, 0].includes(new Date(day).getDay())) classes.push('weekend')
  // 如果周六周日
  const dateString = now === day ? '今天' : new Date(day).getDate();
  return <td className={classnames(classes)} onClick={() => onSelect(day)}>{dateString}</td>
}

function Week (props) {
  const { days, onSelect } = props;
  return <tr className="date-table-days">
    {/* 因为好几个元素都是null，key=null可以接受，而且算重复  */}
    {
      days.map((day, idx) => <Day key={idx} day={day} onSelect={onSelect} />)
    }
  </tr>
}

function Month (props) {
  // 要渲染3个月份,区分它们
  const { startingTimeInMonth, onSelect } = props;
  // 遍历当前月的所有日期.以7天为一组渲染出来
  // 以每一天的0时刻代表这一天
  // 怎么获取到当前所有月的日期??递增日期date,直到month进位
  const startDay = new Date(startingTimeInMonth);
  // currenct是变化的
  const currentDay = new Date(startingTimeInMonth);
  let days = [];
  while (currentDay.getMonth() === startDay.getMonth()) {
    // 记录每一天的0时刻
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // console.log('days', days)
  // 如果对应的1号不是星期一,要补充空白
  // console.log('startDay.getDay()', startDay.getDay())//5 1 3
  // 本月第一天是周五,那么前面补4个
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days);
  const lastDay = new Date(days[days.length - 1]);
  // console.log('lastDay.getDay()', lastDay.getDay())//0 2 5 
  // 本月最后一天是周日,补充0个
  days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null));
  // console.log('days', days) 35个?  对  一个月  一行
  const weeks = [];
  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="date-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {
          weeks.map((week, idx) => <Week key={idx} days={week} onSelect={onSelect} />)
        }
      </tbody>
    </table>
  )
}

export default function DateSelector (props) {
  const { show, onSelect, onBack } = props;

  const now = new Date();
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  // 重置成当月的1号
  now.setDate(1);//就获取到了当前月的0时刻;

  // now.getTime()  1589206648241
  const monthSequence = [now.getTime()];
  // 计算未来两个月的
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  // 下下个月
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title="日期选择" onBack={onBack}></Header>
      <div className="date-selector-tables">
        {
          monthSequence.map(month => <Month onSelect={onSelect} key={month} startingTimeInMonth={month} />)
        }
      </div>
    </div>
  )
}
