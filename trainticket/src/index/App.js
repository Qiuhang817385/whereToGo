import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import './css/App.css'
import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector';
import { toggleHighSpeed, showCitySelector, exchangeFromTo, hideCitySelector, fetchCityData, setSelectedCity, showDateSelector, hideDateSelector, setDepartDate } from './actions'
import { h0 } from '../utils/utils'
function App (props) {
  console.log('props', props)
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  const {
    from,
    to,
    exchangeFromTo,
    showCitySelector,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    departDate,
    showDateSelector,
    isDateSelectorVisible,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed,
    highSpeed
  } = props;

  const doExchangeFromTo = useCallback(exchangeFromTo, [])
  // 这里怎么判断左右,OK,刚才action的逻辑不对
  // 展示图层
  const doShowCitySelector = useCallback(showCitySelector, [])
  // 关闭图层
  const doHideCitySelector = useCallback(hideCitySelector, [])
  const doFetchCityData = useCallback(fetchCityData, [])
  const doSetSelectedCity = useCallback(setSelectedCity, [])
  const doShowDateSelector = useCallback(showDateSelector, [])
  const doDideDateSelector = useCallback(hideDateSelector, [])
  const doOnSelectDate = useCallback((day) => {
    if (!day) return;
    if (day < h0()) return;
    setDepartDate(day);
    hideDateSelector()
  }, [hideDateSelector, setDepartDate])

  const doToggleHighSpeed = useCallback(toggleHighSpeed, [])


  return (
    <div>
      {/* 考虑到组件的复用性，不可以把样式写在组件上面顶死，需要在外面包裹一层来定位 */}
      <div className="header-wrapper">
        <Header title={'火车票'} onBack={onBack}></Header>
      </div>
      <form action="./query.html" className="form">
        <Journey
          from={from}
          to={to}
          exchangeFromTo={doExchangeFromTo}
          showCitySelector={doShowCitySelector}
        ></Journey>
        <DepartDate
          time={departDate}
          onClick={doShowDateSelector}
        ></DepartDate>
        <HighSpeed
          toggle={doToggleHighSpeed}
          highSpeed={highSpeed}
        ></HighSpeed>
        <Submit></Submit>
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        onBack={doHideCitySelector}
        fetchCityData={doFetchCityData}
        onSelect={doSetSelectedCity}
      ></CitySelector>
      <DateSelector
        show={isDateSelectorVisible}
        onBack={doDideDateSelector}
        onSelect={doOnSelectDate}
      ></DateSelector>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = {
  toggleHighSpeed, exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity, showDateSelector, hideDateSelector, setDepartDate
}


export default connect(mapStateToProps, mapDispatchToProps)(App)