import React, { useEffect, useCallback, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import URI from 'urijs';
import './css/App.css'
import Detail from './../common/Detail';
import Candidate from './Candidate'
import Header from '../common/Header'
import Nav from '../common/Nav';
import { TrainContext } from './context';
import {
  setArriveStation, setDepartStation, setTrainNumber, setDepartDate, setSearchParsed, nextDate,
  prevDate,
  setArriveTimeStr, setDepartTimeStr, setArriveDate, setDurationStr, setTickets,
  toggleIsScheduleVisible
} from './actions';
import { h0 } from './../utils/utils';
import dayjs from 'dayjs';
import useNav from '../common/useNav';
// 传递对象的方式，虽然减少了连接时候的代码，但是额外增加了dispatch的时候传递给props的代码
function App (props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
    setArriveStation, setDepartStation, setTrainNumber, setDepartDate, setSearchParsed, nextDate,
    prevDate,
    setArriveTimeStr, setDepartTimeStr, setArriveDate, setDurationStr,
    setTickets,
    toggleIsScheduleVisible
  } = props
  // console.log('props', props)
  const onBack = useCallback(() => {
    window.history.back();
  }, [])


  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const {
      aStation,
      dStation,
      trainNumber,
      dates,
    } = queries

    setArriveStation(aStation)
    setDepartStation(dStation)
    setTrainNumber(trainNumber)
    setDepartDate(h0(dayjs(dates).valueOf()))
    console.log('date', dates)
    console.log('h0(dayjs(date).valueOf()))', h0(dayjs(dates).valueOf()));
    setSearchParsed(true)
  }, [])

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } = useNav(departDate, prevDate, nextDate)

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber])

  const doToggleIsScheduleVisible = useCallback(() => {
    toggleIsScheduleVisible()
  }, [toggleIsScheduleVisible])

  const Schedule = lazy(() => import('./Schedule.js'));

  /**
   * 发起异步请求
   */
  useEffect(() => {
    console.log('searchParsed', searchParsed)
    if (!searchParsed) return;
    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString();

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const { detail: {
          arriveTimeStr,
          departTimeStr,
          arriveDate,
          durationStr
        }, candidates } = res;
        console.log('departTimeStr', departTimeStr)
        setArriveTimeStr(arriveTimeStr)
        setDepartTimeStr(departTimeStr)
        setArriveDate(arriveDate)
        setDurationStr(durationStr)
        setTickets(candidates)
      })

  }, [searchParsed, setArriveTimeStr,
    setDepartTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets,])



  if (!searchParsed) return null;

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack}></Header>
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        // doToggleIsScheduleVisible={doToggleIsScheduleVisible}
        >
          <span className="left"></span>
          <span className="schedule" onClick={() => { doToggleIsScheduleVisible() }}>时刻表</span>
          <span className="right"></span>
        </Detail>
      </div>
      <TrainContext.Provider value={{ trainNumber, departStation, arriveStation, departDate }}>
        <Candidate
          tickets={tickets}
        ></Candidate>
      </TrainContext.Provider>
      {
        isScheduleVisible &&
        <div className="mask" onClick={() => { doToggleIsScheduleVisible() }}>
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      }
    </div>
  )
}
const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = {
  setArriveStation, setDepartStation, setTrainNumber, setDepartDate, setSearchParsed, nextDate,
  prevDate,
  setArriveTimeStr, setDepartTimeStr, setArriveDate, setDurationStr, setTickets,
  toggleIsScheduleVisible
}


export default connect(mapStateToProps, mapDispatchToProps)(App)