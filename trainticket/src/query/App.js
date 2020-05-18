// Shift+Alt+O
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import Header from '../common/Header';
import Nav from '../common/Nav';
import { h0 } from '../utils/utils';
import useNav from './../common/useNav';
import {
  setCheckedTicketTypes, setCheckedTrainTypes, setCheckedDepartStations, setCheckedArriveStations,
  setDepartTimeStart, setDepartTimeEnd, setArriveTimeStart, setArriveTimeEnd
  , nextDate, prevDate, setArriveStations, setDepartDate, setDepartStations, setFrom, setHighSpeed, setSearchParsed, setTicketTypes, setTo, setTrainList, setTrainTypes, toggleHighSpeed, toggleIsFiltersVisible, toggleOnlyTickets, toggleOrderType
} from './actions';
import Bottom from './Bottom';
import './css/App.css';
import List from './List';
function App (props) {
  const {
    from, to, setFrom, setTo, setDepartDate, setHighSpeed, setSearchParsed,
    setTrainList, setTicketTypes, setTrainTypes, setDepartStations, setArriveStations,
    departDate, highSpeed,
    searchParsed,
    orderType,
    onlyTickets,

    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,

    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,

    prevDate, nextDate,
    trainList,
    isFiltersVisible,
    // 底部
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    // 浮层
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,



    setCheckedTicketTypes, setCheckedTrainTypes, setCheckedDepartStations, setCheckedArriveStations,
    setDepartTimeStart, setDepartTimeEnd, setArriveTimeStart, setArriveTimeEnd
  } = props;
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  // 解析url参数
  useEffect(() => {
    const { from, to, date, highSpeed } = URI.parseQuery(window.location.search);
    setFrom(from);
    setTo(to);
    // console.log('date', date)//2020-05-12
    // console.log('dayjs(date).valueOf()', dayjs(date).valueOf())//1589212800000
    setDepartDate(h0(dayjs(date).valueOf()));
    setHighSpeed(highSpeed === 'true')

    // 标记解析完成
    setSearchParsed(true)
  }, [setFrom, setTo, setDepartDate, setHighSpeed, setSearchParsed])
  /**
   * 发起异步请求,useEffect除了return一个清理函数，只能return一个undefined
   */
  useEffect(() => {
    if (!searchParsed) return;
    let url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join(''))
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join(''))
      .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join(''))
      .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join(''))
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd).toString();
    // console.log('url', url)

    fetch(url).then(res => res.json())
      .then(res => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation,
              },
            },
          },
        } = res;
        setTrainList(trains);
        setTicketTypes(ticketType);
        setTrainTypes(trainType);
        setDepartStations(depStation);
        setArriveStations(arrStation);
        // console.log('res', res)
      })

  }, [from, to, departDate, highSpeed, searchParsed, orderType, onlyTickets, checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations, departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd, setTrainList, setTicketTypes, setTrainTypes, setDepartStations, setArriveStations])

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } = useNav(departDate, prevDate, nextDate)


  // const bottomCbs = useMemo(() => {
  //   return {
  //     toggleOrderType,
  //     toggleHighSpeed,
  //     toggleOnlyTickets,
  //     toggleIsFiltersVisible,
  //     setCheckedTicketTypes,
  //     setCheckedTrainTypes,
  //     setCheckedDepartStations,
  //     setCheckedArriveStations,
  //     setDepartTimeStart,
  //     setDepartTimeEnd,
  //     setArriveTimeStart,
  //     setArriveTimeEnd,
  //   }
  // }, [])
  // const bottomCbs = () => {
  //   return {
  //     toggleOrderType,
  //     toggleHighSpeed,
  //     toggleOnlyTickets,
  //     toggleIsFiltersVisible,
  //     setCheckedTicketTypes,
  //     setCheckedTrainTypes,
  //     setCheckedDepartStations,
  //     setCheckedArriveStations,
  //     setDepartTimeStart,
  //     setDepartTimeEnd,
  //     setArriveTimeStart,
  //     setArriveTimeEnd,
  //   }
  // }

  const doToggleOrderType = useCallback(toggleOrderType, [])
  const doToggleHighSpeed = useCallback(toggleHighSpeed, [])
  const doToggleOnlyTickets = useCallback(toggleOnlyTickets, [])
  const doToggleIsFiltersVisible = useCallback(toggleIsFiltersVisible, [])

  const doSetCheckedTicketTypes = useCallback(setCheckedTicketTypes, [])
  const doSetCheckedTrainTypes = useCallback(setCheckedTrainTypes, [])
  const doSetCheckedDepartStations = useCallback(setCheckedDepartStations, [])
  const doSetCheckedArriveStations = useCallback(setCheckedArriveStations, [])


  const doSetDepartTimeStart = useCallback(setDepartTimeStart, [])
  const doSetDepartTimeEnd = useCallback(setDepartTimeEnd, [])
  const doSetArriveTimeStart = useCallback(setArriveTimeStart, [])
  const doSetArriveTimeEnd = useCallback(setArriveTimeEnd, [])

  // 两次渲染过程，经历的hook函数不匹配会导致错误
  // React Hook "useCallback" is called conditionally. 
  // React Hooks must be called in the exact same order in every component render. 
  // Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
  // 过早的return
  // url参数不足，异步请求失败的处理
  if (!searchParsed) {
    return null;
  }
  // console.log('departDate', dayjs(departDate).format('YYYY-MM-DD'))
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
      </div>
      <Nav
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        date={departDate}
        prev={prev}
        next={next}
      ></Nav>
      <List
        list={trainList}
        date={departDate}
      ></List>
      <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}

        // {...bottomCbs()}
        // {...bottomCbs}

        doToggleOrderType={doToggleOrderType}
        doToggleHighSpeed={doToggleHighSpeed}
        doToggleOnlyTickets={doToggleOnlyTickets}
        doToggleIsFiltersVisible={doToggleIsFiltersVisible}
        // 浮层
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}

        // 操作
        doSetCheckedTicketTypes={doSetCheckedTicketTypes}
        doSetCheckedTrainTypes={doSetCheckedTrainTypes}
        doSetCheckedDepartStations={doSetCheckedDepartStations}
        doSetCheckedArriveStations={doSetCheckedArriveStations}
        doSetDepartTimeStart={doSetDepartTimeStart}
        doSetDepartTimeEnd={doSetDepartTimeEnd}
        doSetArriveTimeStart={doSetArriveTimeStart}
        doSetArriveTimeEnd={doSetArriveTimeEnd}
      ></Bottom>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = {
  setFrom, setTo, setDepartDate, setHighSpeed, setSearchParsed,
  setTrainList, setTicketTypes, setTrainTypes, setDepartStations, setArriveStations,
  setCheckedTicketTypes, setCheckedTrainTypes, setCheckedDepartStations, setCheckedArriveStations,
  prevDate, nextDate,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  setDepartTimeStart, setDepartTimeEnd, setArriveTimeStart, setArriveTimeEnd
}


export default connect(mapStateToProps, mapDispatchToProps)(App)