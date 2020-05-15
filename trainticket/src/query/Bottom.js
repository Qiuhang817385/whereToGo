import React, { memo, useState, useReducer, useMemo } from 'react'
import './css/Bottom.css';
import { ORDER_DEPART } from './constant';
import classnames from 'classnames';
// import Slider from './Slider';
function checkedReducer (state, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case 'reset':
      return {};
    case 'toggle':
      newState = { ...state };
      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }
      return newState;
    default:
  }
  return state;
}


const Filter = memo(function (props) {
  const { name, checked,
    // toggle,
    dispatch,
    value } = props;
  // 子组件调用父组件方法，子组件无法感知到父组件数据的存在，逻辑是在父组件当中做的
  return (
    <li className={classnames({ checked })} onClick={() => {
      // toggle(value) 
      dispatch({ payload: value, type: 'toggle' })
    }}>
      {name}
    </li>
  )
})

const Option = memo(function (props) {
  const { title, options, checkedMap, dispatch } = props;
  // update更新的是checkedMap级别的数据
  // 这一段逻辑联系了3个层次的组件，而且完全解耦了
  // 没有办法传递到下一层，因为下一层没有使用到checkedMap，无法感知它的存在
  // 为了切换某个选项是否被选中
  // 这一段的逻辑不错，可以对象去重？？？
  // const toggle = useCallback((value) => {
  //   const newCheckedMap = { ...checkedMap };
  //   console.log('newCheckedMap', newCheckedMap)
  //   console.log('value', value)
  //   if (value in newCheckedMap) {
  //     delete newCheckedMap[value]
  //   } else {
  //     newCheckedMap[value] = true;
  //   }
  //   update(newCheckedMap)
  //   // localStorage.setItem('newCheckedMap', JSON.stringify(newCheckedMap))
  // }, [checkedMap, update]
  // )
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map(option => <Filter
            // toggle={toggle} 
            dispatch={dispatch}
            key={option.value} {...option} checked={option.value in checkedMap} />)
        }
      </ul>
    </div>
  )
})




const BottomModal = memo(function (props) {
  const {
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    //
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    // 
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    // 操作
    doSetCheckedTicketTypes,
    doSetCheckedTrainTypes,
    doSetCheckedDepartStations,
    doSetCheckedArriveStations,
    // 
    doSetDepartTimeStart,
    doSetDepartTimeEnd,
    doSetArriveTimeStart,
    doSetArriveTimeEnd,

    doToggleIsFiltersVisible
  } = props;

  // const initiVal = {
  //   checkedTicketTypes,
  //   checkedTrainTypes,
  //   checkedDepartStations,
  //   checkedArriveStations
  // }
  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  // 本地缓存的副本，使用函数的形式，只会在第一次的时候计算一遍，而不是每次渲染都传入
  const [localCheckedTicketTypes, LocalCheckedTicketTypesDispatch] = useReducer(checkedReducer, checkedTicketTypes, (checkedTicketTypes) => {
    return {
      ...checkedTicketTypes,
    };
  });

  const [localCheckedTrainTypes, LocalCheckedTrainTypesDispatch] = useReducer(checkedReducer, checkedTrainTypes, (checkedTrainTypes) => {
    return {
      ...checkedTrainTypes,
    };
  });

  const [localCheckedDepartStations, LocalCheckedDepartStationsDispatch] = useReducer(checkedReducer, checkedDepartStations, (checkedDepartStations) => {
    return {
      ...checkedDepartStations,
    };
  });

  const [localCheckedArriveStations, LocalCheckedArriveStationsDispatch] = useReducer(checkedReducer, checkedArriveStations, (checkedArriveStations) => {
    return {
      ...checkedArriveStations,
    };
  });
  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      // update: setLocalCheckedTicketTypes,
      dispatch: LocalCheckedTicketTypesDispatch,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      // update: setLocalCheckedTrainTypes,
      dispatch: LocalCheckedTrainTypesDispatch,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      // update: setLocalCheckedDepartStations
      dispatch: LocalCheckedDepartStationsDispatch
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      // update: setLocalCheckedArriveStations,
      dispatch: LocalCheckedArriveStationsDispatch,
    }
  ];

  const isResetDisabled = useMemo(() => {
    return Object.keys(localCheckedTicketTypes).length === 0
      && Object.keys(localCheckedTrainTypes).length === 0
      && Object.keys(localCheckedDepartStations).length === 0
      && Object.keys(localCheckedArriveStations).length === 0
      && localDepartTimeStart === 0
      && localDepartTimeEnd === 24
      && localArriveTimeStart === 0
      && localArriveTimeEnd === 24
  }, [localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd,]);
  function reset () {
    if (isResetDisabled) { return }
    LocalCheckedTicketTypesDispatch({ type: 'reset' });
    LocalCheckedTrainTypesDispatch({ type: 'reset' });
    LocalCheckedDepartStationsDispatch({ type: 'reset' });
    LocalCheckedArriveStationsDispatch({ type: 'reset' });

    setLocalDepartTimeStart(0)
    setLocalDepartTimeEnd(24)
    setLocalArriveTimeStart(0)
    setLocalArriveTimeEnd(24)


    // setLoca
  }
  function sure () {
    // setch
    console.log('ok')
    // let newCheckedMap = localStorage.getItem('newCheckedMap')
    // doSetCheckedTrainTypes(newCheckedMap)

    doSetCheckedTicketTypes(localCheckedTicketTypes)
    doSetCheckedTrainTypes(localCheckedTrainTypes)
    doSetCheckedDepartStations(localCheckedDepartStations)
    doSetCheckedArriveStations(localCheckedArriveStations)
    // 
    doSetDepartTimeStart(localDepartTimeStart)
    doSetDepartTimeEnd(localDepartTimeEnd)
    doSetArriveTimeStart(localArriveTimeStart)
    doSetArriveTimeEnd(localArriveTimeEnd)

    doToggleIsFiltersVisible()
  }
  console.log('isResetDisabled', isResetDisabled)
  return (<div className="bottom-modal">
    <div className="bottom-dialog">
      <div className="bottom-dialog-content">
        <div className="title">
          <span className={classnames('reset', {
            disabled: isResetDisabled
          })} onClick={reset}>
            重置
              </span>
          <span className="ok" onClick={sure}>
            确定
              </span>
        </div>
        <div className="options">
          {
            optionGroup.map(group => <Option {...group} key={group.title}></Option>)
          }
          {/* <Slider
            title="出发时间"
            currentStartHours={localDepartTimeStart}
            currentEndHours={localDepartTimeEnd}
            onStartChanged={setLocalDepartTimeStart}
            onEndChanged={setLocalDepartTimeEnd}
          />
          <Slider
            title="到达时间"
            currentStartHours={localArriveTimeStart}
            currentEndHours={localArriveTimeEnd}
            onStartChanged={setLocalArriveTimeStart}
            onEndChanged={setLocalArriveTimeEnd}
          /> */}
        </div>
      </div>
    </div>
  </div>)
})

export default function Bottom (props) {
  const {
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    doToggleOrderType,
    doToggleHighSpeed,
    doToggleOnlyTickets,
    doToggleIsFiltersVisible,

    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    //
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    // 
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    // 操作
    doSetCheckedTicketTypes,
    doSetCheckedTrainTypes,
    doSetCheckedDepartStations,
    doSetCheckedArriveStations,
    // 
    doSetDepartTimeStart,
    doSetDepartTimeEnd,
    doSetArriveTimeStart,
    doSetArriveTimeEnd,
  } = props

  // console.log('checkedTrainTypes', Object.keys(checkedTrainTypes), checkedTrainTypes)

  // 这里不能使用useMemo
  // 因为对象没有变,里面变了,检测不到
  const noChecked = /* useMemo(() => { */
    /* return */ Object.keys(checkedTicketTypes).length === 0
    && Object.keys(checkedTrainTypes).length === 0
    && Object.keys(checkedDepartStations).length === 0
    && Object.keys(checkedArriveStations).length === 0
    && departTimeStart === 0
    && departTimeEnd === 24
    && arriveTimeStart === 0
    && arriveTimeEnd === 24
  /* }, [checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,]) */;

  console.log('noChecked', noChecked)
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={doToggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
        </span>
        <span
          className={classnames('item', { 'item-on': highSpeed })}
          onClick={doToggleHighSpeed}
        >
          <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
                    只看高铁动车
                </span>
        <span
          className={classnames('item', { 'item-on': onlyTickets })}
          onClick={doToggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
                    只看有票
                </span>
        <span
          className={classnames('item', { 'item-on': isFiltersVisible || !noChecked })}
          onClick={doToggleIsFiltersVisible}
        >
          <i className="icon">{noChecked ? '\uf0f7' : '\uf446'}</i>
                    综合筛选
                </span>
      </div>
      {
        isFiltersVisible && (
          <BottomModal
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
            doSetCheckedTicketTypes={doSetCheckedTicketTypes}
            doSetCheckedTrainTypes={doSetCheckedTrainTypes}
            doSetCheckedDepartStations={doSetCheckedDepartStations}
            doSetCheckedArriveStations={doSetCheckedArriveStations}
            doSetDepartTimeStart={doSetDepartTimeStart}
            doSetDepartTimeEnd={doSetDepartTimeEnd}
            doSetArriveTimeStart={doSetArriveTimeStart}
            doSetArriveTimeEnd={doSetArriveTimeEnd}
            doToggleIsFiltersVisible={doToggleIsFiltersVisible}
          />
        )
      }
    </div>
  )
}
