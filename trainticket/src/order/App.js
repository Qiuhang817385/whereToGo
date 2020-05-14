import React, { useCallback, useEffect, useMemo } from 'react'
import dayjs from 'dayjs';
import URI from 'urijs';
import Detail from './../common/Detail';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './css/App.css'
import {
  setDepartStation, setArriveStation, setTrainNumber, setSeatType, setDepartDate, setSearchParsed,
  fetchInitial,
  createAdult, createChild, removePassenger, updatePassenger,
  showMenu, hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
} from './actions';
import Header from './../common/Header';
import Account from './Account';
import Choose from './Choose';
import Menu from './Menu';
import Passengers from './Passengers';
import Ticket from './Ticket'
function App (props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    setDepartStation, setArriveStation, setTrainNumber, setSeatType, setDepartDate, setSearchParsed,
    fetchInitial,
    createAdult, createChild, removePassenger, updatePassenger,
    showMenu, hideMenu,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const {
      trainNumber,
      dStation,
      aStation,
      type,
      date
    } = queries
    console.log('queries', queries);

    setDepartStation(trainNumber)
    setArriveStation(dStation)
    setTrainNumber(aStation)
    setSeatType(type)
    setDepartDate(dayjs(date).valueOf())
    setSearchParsed(true)
  }, [])

  useEffect(() => {
    if (!searchParsed) return;

    const url = new URI('/rest/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()

    fetchInitial(url)

  }, [departStation,
    arriveStation,
    seatType,
    departDate,
    searchParsed])

  const doCreateAdult = useCallback(() => {
    createAdult()
  }, [createAdult])
  const doCreateChild = useCallback(() => {
    createChild()
  }, [createChild])
  const doRemovePassenger = useCallback((v) => {
    removePassenger(v)
  }, [removePassenger])
  const doUpdatePassenger = useCallback((id, val) => {
    updatePassenger(id, val)
  }, [updatePassenger])
  const doHideMenu = useCallback(() => {
    hideMenu()
  }, [hideMenu])
  const doShowMenu = useCallback((v) => {
    showMenu(v)
  }, [showMenu])

  const doShowGenderMenu = useCallback((v) => {
    showGenderMenu(v)
  }, [showGenderMenu])
  const doShowFollowAdultMenu = useCallback((v) => {
    showFollowAdultMenu(v)
  }, [showFollowAdultMenu])
  const doShowTicketTypeMenu = useCallback((v) => {
    showTicketTypeMenu(v)
  }, [showTicketTypeMenu])

  // const passengersCbs = useMemo(() => {
  // return bindActionCreators({
  //   createAdult,
  //   createChild
  // }, dispatch)
  // }, [])


  if (!searchParsed) return null;

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title='订单填写' onBack={onBack}></Header>
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
        >
          <span className="train-icon" style={{ display: 'block' }}></span>
        </Detail>
      </div>
      <Ticket price={price} type={seatType} />
      <Passengers passengers={passengers}
        createAdult={doCreateAdult} createChild={doCreateChild}
        removePassenger={doRemovePassenger}
        updatePassenger={doUpdatePassenger}
        showMenu={doShowMenu}
        showGenderMenu={doShowGenderMenu}
        showFollowAdultMenu={doShowFollowAdultMenu}
        showTicketTypeMenu={doShowTicketTypeMenu}
      // {...passengersCbs}
      />
      {
        passengers.length > 0 &&
        <Choose passengers={passengers} updatePassenger={doUpdatePassenger} />
      }
      <Account length={passengers.length} price={price} />
      <Menu
        show={isMenuVisible}
        {
        ...menu
        }
        hideMenu={doHideMenu}
      />

    </div>
  )
}
const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = {
  setDepartStation, setArriveStation, setTrainNumber, setSeatType, setDepartDate, setSearchParsed,
  fetchInitial,
  createAdult, createChild, removePassenger, updatePassenger,
  showMenu, hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)