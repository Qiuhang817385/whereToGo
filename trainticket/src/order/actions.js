export const ACTION_SET_TRAIN_NUMBER = 'TRAINNUMBER'
export const ACTION_SET_DEPART_STATION = 'DEPARTSTATION'
export const ACTION_SET_ARRIVE_STATION = 'ARRIVESTATION'
export const ACTION_SET_SEAT_TYPE = 'SEATTYPE'
export const ACTION_SET_DEPART_DATE = 'DEPARTDATE'
export const ACTION_SET_ARRIVE_DATE = 'ARRIVEDATE'
export const ACTION_SET_DEPART_TIME_STR = 'DEPARTTIMESTR'
export const ACTION_SET_ARRIVE_TIME_STR = 'ARRIVETIMESTR'
export const ACTION_SET_DURATION_STR = 'DURATIONSTR'
export const ACTION_SET_PRICE = 'PRICE'
export const ACTION_SET_PASSENGERS = 'PASSENGERS'
export const ACTION_SET_MENU = 'MENU'
export const ACTION_SET_IS_MENU_VISIBLE = 'ISMENUVISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'SEARCHPARSED'

export const setTrainNumber = function (payload) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload
  }
}
export const setDepartStation = function (payload) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload
  }
}
export const setArriveStation = function (payload) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload
  }
}
export const setSeatType = function (payload) {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload
  }
}
export const setDepartDate = function (payload) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload
  }
}
export const setArriveDate = function (payload) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload
  }
}
export const setDepartTimeStr = function (payload) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload
  }
}
export const setArriveTimeStr = function (payload) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload
  }
}
export const setDurationStr = function (payload) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload
  }
}
export const setPrice = function (payload) {
  return {
    type: ACTION_SET_PRICE,
    payload
  }
}
export const setPassengers = function (payload) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload
  }
}
export const setMenu = function (payload) {
  return {
    type: ACTION_SET_MENU,
    payload
  }
}
export const setIsMenuVisible = function (payload) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload
  }
}
export const setSearchParsed = function (payload) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload
  }
}

export function fetchInitial (url) {
  return (dispatch, getState) => {
    fetch(url).then(res => res.json())
      .then(data => {
        console.log('data', data)
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price
        } = data;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price))
      })
  }
}

let passengerIdSeed = 0;
// 创建成人对象
export function createAdult () {
  return (dispatch, getState) => {
    const { passengers } = getState();
    // 如果第二次添加检查到上一次添加的字段里面有空的,那么拒绝添加
    // 如果第二次添加检查到上一次添加的字段里面有空的,那么拒绝添加
    // 如果第二次添加检查到上一次添加的字段里面有空的,那么拒绝添加
    for (const passenger of passengers) {
      const keys = Object.keys(passenger);
      for (const key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
    }
    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        name: '',
        ticketType: 'adult',
        licenceNo: '',
        seat: 'Z'
      }
    ]))
  }
}
// 创建儿童对象
export function createChild () {
  return (dispatch, getState) => {
    const { passengers } = getState();

    // 如果第二次添加检查到上一次添加的字段里面有空的,那么拒绝添加
    // 如果第二次添加检查到上一次添加的字段里面有空的,那么拒绝添加
    // 如果第二次添加检查到上一次添加的字段里面有空的,那么拒绝添加
    let adultFound = null;
    for (const passenger of passengers) {
      const keys = Object.keys(passenger);
      for (const key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
      if (passenger.ticketType === 'adult') {
        adultFound = passenger.id;
      }
    }
    if (!adultFound) {
      alert('请至少添加一个同行成人');
      return;
    }
    // 添加,我居然忘了添加怎么写了,不就结构赋值加之前的值吗...
    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        name: '',
        gender: 'none',
        birthday: '',
        // 指向成人的id
        followAdult: adultFound,
        ticketType: 'child',
        seat: 'Z'
      }
    ]))
  }
}

export function removePassenger (id) {
  // 只有使用这样的异步中间件,才能获取到store中最新的状态
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newPassengers = passengers.filter(passenger => {
      // 这样会实现,成人如果被剔除,那么儿童也需要被剔除
      return passenger.id !== id && passenger.followAdult !== id;
    })
    dispatch(setPassengers(newPassengers));
  }
}

// 每一步的更新操作都会调用action????
// 添加第三个字段,删除字段,这样的方式我真的想不出来
export function updatePassenger (id, data, keysToBeRemoved = []) {
  console.log('data', data)
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i < passengers.length; i++) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data)

        // 在这个数组当中出现的key需要被删除
        for (let key of keysToBeRemoved) {
          delete newPassengers[i][key]
        }

        dispatch(setPassengers(newPassengers))

        break;
      }
    }
  }
}

export function showMenu (menu) {
  return (dispatch) => {
    dispatch(setMenu(menu))
    dispatch(setIsMenuVisible(true))
  }
}

// 展示弹出组件,在内部传递函数选项,用于更新其他的dispatch,其实从那个html结构来看,里面肯定有更新的行为,
// 但是我之前不知道这个更新行为在哪操作,现在有了地方,就是在thunk状态管理 actionCreator里面来进行更新和显示的操作
export function showGenderMenu (id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find(passenger => passenger.id === id)
    if (!passenger) return;

    dispatch(showMenu({
      onPress (gender) {
        dispatch(updatePassenger(id, { gender }));
        dispatch(hideMenu());
      },
      options: [
        { title: '男', value: 'male', active: 'male' === passenger.gender },
        { title: '女', value: 'female', active: 'female' === passenger.gender },
      ]
    }))
  }
}

// 选取同行的成人
export function showFollowAdultMenu (id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find(passenger => passenger.id === id)
    if (!passenger) return;

    // 视频这里是setMenu,视频错了
    dispatch(showMenu({
      onPress (followAdult) {
        console.log('followAdult', followAdult)
        dispatch(updatePassenger(id, { followAdult }));
        dispatch(hideMenu());
      },
      // 动态映射
      options: passengers.filter(passenger => passenger.ticketType === 'adult')
        .map(adult => ({
          title: adult.name,
          value: adult.id,
          active: adult.id === passenger.followAdult
        }))
    }))

  }
}

// 最难的一个,切换车票类型
// 1.类型不同,字段不一样
// 2.没有成人票的话,成人票是不能切换成儿童票的
// 这些发生在弹出菜单之后,先解决弹出菜单问题
export function showTicketTypeMenu (id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find(passenger => passenger.id === id)
    if (!passenger) return;
    dispatch(showMenu({
      onPress (ticketType) {
        // 儿童切换成成人,需要添加licenceNo字段,删除gender,followAdult和birthday3个字段
        if (ticketType === 'adult') {
          dispatch(updatePassenger(id, {
            ticketType,
            licenceNo: '',
          }, ['gender', 'followAdult', 'birthday']))
        } else {
          // 判断是否有其他的成人乘客

          const adult = passengers.find((passenger) => passenger.id !== id && passenger.ticketType === 'adult');
          // 找到
          if (adult) {
            dispatch(updatePassenger(id, {
              ticketType,
              gender: '',
              followAdult: adult.id,
              birthday: ''
            }, ['licenceNo']))
          } else {//没找到
            alert('没有随行成人')
          }
        }

        dispatch(hideMenu());
      },
      // 动态映射
      options: [
        { title: '成人票', value: 'adult', active: passenger.ticketType === 'adult' },
        { title: '儿童票', value: 'child', active: passenger.ticketType === 'child' },
      ]
    }))


  }
}


export function hideMenu () {
  return setIsMenuVisible(false)
}

// 疑问,流程的不同   dispatch+bindActionCreator,参数?  和直接对象+参数
// 


