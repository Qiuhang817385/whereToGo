import React, { memo } from 'react';
import { alphaBet, AlphaIndex } from './Alpha'
const CityItem = memo(
  function (props) {
    const { name, onSelect } = props;
    return (
      <li className='city-li' onClick={() => onSelect(name)}>{name}</li>
    )
  })
const CitySection = memo(function (props) {
  const { title, cities, onSelect } = props;
  return (
    <ul className='city-ul'>
      <li className='city-li' key={title} data-cate={title}>{title}</li>
      {cities.map(city => <CityItem key={city.name} name={city.name} onSelect={onSelect} />)}
    </ul>
  )
})
export default memo(
  function (props) {
    const { sections, onSelect, toAlpha } = props;
    return (
      <div className="city-list">
        <div className="city-cate">
          {sections.map(section => <CitySection key={section.title} onSelect={onSelect} title={section.title} cities={section.citys || []} />)}
        </div>
        <div className="city-index">
          {alphaBet.map(v => <AlphaIndex onClick={toAlpha} key={v} alpha={v} />)}
        </div>
      </div>
    )
  }
)