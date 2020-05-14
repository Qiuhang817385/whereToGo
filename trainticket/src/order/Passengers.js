import React, { memo, useMemo } from 'react'
import './css/Passengers.css'

const Passenger = memo(function (props) {
  const { id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,

    followAdultNameMap
  } = props;
  console.log('followAdultNameMap', followAdultNameMap)
  // 提取判断逻辑
  const isAdult = ticketType === 'adult';

  return (<li className='passenger'>
    <i className="delete" onClick={() => { onRemove(id) }}>-</i>
    <ol className="items">
      {/* 下面每一个li是每一个字段 */}
      <li className="item">
        <label className="label name">姓名</label>
        <input type="text"
          className='input name'
          placeholder="乘客姓名"
          value={name}
          // 这个也是一个actionCreator,直接操作store???
          onChange={(e) => { onUpdate(id, { name: e.target.value }) }}
        />
        <label className='ticket-type' onClick={() => { showTicketTypeMenu(id) }}>
          {
            isAdult ? '成人票' : '儿童票'
          }
        </label>
      </li>
      {/* 只有成人才有身份证 */}
      {
        isAdult &&
        <li className="item">
          <label className="label licenceNo">身份证</label>
          <input type="text"
            className='input name'
            placeholder="证件号码"
            value={licenceNo}
            // 这个也是一个actionCreator,直接操作store???
            onChange={(e) => { onUpdate(id, { licenceNo: e.target.value }) }}
          />
        </li>
      }
      {/* 儿童性别,会唤起菜单 */}
      {
        !isAdult &&
        <li className="item arrow" onClick={() => { showGenderMenu(id) }}>
          <label className="label gender" >性别</label>
          <input type="text"
            className='input gender'
            placeholder="请选择"
            value={
              gender === 'male' ? '男' : gender === 'female' ? '女' : ''
            }
            // 这个也是一个actionCreator,直接操作store???
            readOnly
          />
        </li>
      }
      {/* 出生日期 */}
      {
        !isAdult &&
        <li className="item">
          <label className="label birthday">出生日期</label>
          <input type="text"
            className='input birthday'
            placeholder="出生日期"
            value={birthday}
            // 这个也是一个actionCreator,直接操作store???
            onChange={(e) => { onUpdate(id, { birthday: e.target.value }) }}
          />
        </li>
      }
      {/* 同行成人 */}
      {
        !isAdult &&
        <li className="item arrow" onClick={() => { showFollowAdultMenu(id) }}>
          <label className="label followAdult" >同行成人</label>
          <input type="text"
            className='input followAdult'
            placeholder="请选择"
            value={followAdultNameMap}
            // 这个也是一个actionCreator,直接操作store???
            readOnly
          />
        </li>
      }
      {/* 自定义的弹出式菜单 */}
    </ol>
  </li>)
})

export default memo(function Passengers (props) {

  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,

    showMenu,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
  } = props;


  // 构建id到name的映射
  // 返回的是一个对象,每一个对象的id被映射成name
  const nameMap = useMemo(() => {
    const ret = {};
    for (const iterator of passengers) {
      ret[iterator.id] = iterator.name;
    }
    return ret
  }, [passengers])

  return (
    <div className="passengers">
      <ul>
        {
          passengers.map((passenger) => {
            return <Passenger
              onRemove={removePassenger}
              onUpdate={updatePassenger}
              {...passenger}
              showGenderMenu={showGenderMenu}
              showFollowAdultMenu={showFollowAdultMenu}
              showTicketTypeMenu={showTicketTypeMenu}
              followAdultNameMap={nameMap[passenger.followAdult]}
            />
          })
        }
      </ul>
      <section className="add">
        <div className="adult" onClick={() => { createAdult() }}>添加成人</div>
        <div className="child" onClick={() => { createChild() }}>添加儿童</div>
      </section>
    </div>
  )
})
