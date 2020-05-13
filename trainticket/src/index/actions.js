export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
// ok🆗
// new🆕
// no_b⛔️  u7🈲  mu

export function setFrom (from) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}

export function setTo (to) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}

export function setIsLoadingCityData (isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData,
  };
}

export function setCityData (cityDate) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityDate,
  };
}

export function toggleHighSpeed () {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed,
    });
  };
}

export function showCitySelector (currentSelectingLeftCity) {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });

    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  };
}

export function hideCitySelector () {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  };
}
/**
 * 回填数据+关闭浮层
 */
export function setSelectedCity (city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) {
      // 回填左侧
      dispatch(setFrom(city));
    } else {
      // 回填右侧
      dispatch(setTo(city));
    }
    // 关闭浮层
    dispatch(hideCitySelector());
  };
}

export function showDateSelector () {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true,
  };
}

export function hideDateSelector () {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  };
}

export const setDepartDate = (payload) => ({
  type: ACTION_SET_DEPART_DATE,
  payload
})


/**
 * 始发终点，调换
 */
export const exchangeFromTo = () => (dispatch, getState) => {
  const { from, to } = getState();
  dispatch(setFrom(to));
  dispatch(setTo(from));
}


/**
 * 发起异步请求
 */
export const fetchCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    // 这一步，是为了处理，如果同时有相同的请求，直接return,下面不再执行
    if (isLoadingCityData) return;
    dispatch(setIsLoadingCityData(true)); ///显示loading
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')  // 缓存处理,缓存有,直接读取
    if (Date.now() < cache.expires) {     //查看过期时间,比较
      dispatch(setCityData(cache.data));
      return; // 有缓存,没有过期直接return
    }
    fetch('/rest/cities?_' + Date.now()).then((res) => res.json())   // 异步请求
      .then(res => {
        console.log('res', res)
        dispatch(setCityData(res));
        dispatch(setIsLoadingCityData(false));  //关闭loading
        localStorage.setItem('city_data_cache', //存入缓存和生成过期时间
          JSON.stringify({
            expires: Date.now() + 600 * 1000,
            data: res
          })
        )
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false));  //关闭loading
      })
  }
}
