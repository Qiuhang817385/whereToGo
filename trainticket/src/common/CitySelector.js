import React, { useEffect, useState, useMemo, memo } from 'react'
import './css/CitySelector.css'
import classnames from 'classnames';
import CityList from './List';
import Suggest from './SearchSuggest';
// CitySelector
export default memo((props) => {

  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;
  const [searchKey, setSearchKey] = useState('');
  // 尝试，这里不能用useRef
  let key = useMemo(() => searchKey.trim(), [searchKey])
  useEffect(() => {
    if (!show || cityData || isLoading) return;
    fetchCityData()
  }, [show, cityData, isLoading, fetchCityData]);

  // 定义在顶层,方法逻辑
  const toAlpha = alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
  }
  const outputCitySections = () => {
    if (isLoading) return (<div>Loading</div>);
    if (cityData) { return (<CityList toAlpha={toAlpha} sections={cityData.cityList} onSelect={onSelect} />) }
    return (<div>Error</div>)
  }
  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        {/* 这个功能太秀了 */}
        <i
          onClick={() => setSearchKey('')}
          className={classnames('search-clean', {
            hidden: key.length === 0,
          })}>
          ×
        </i>
      </div>
      {
        Boolean(key) && (
          <Suggest onSelect={key => onSelect(key)} searchKey={key}></Suggest>
        )
      }
      {outputCitySections()}
    </div>
  )
})
