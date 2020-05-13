import React, { useEffect, memo, useState, useMemo } from 'react'
/**
 * 搜索
 */
const SuggestionItem = memo(function (props) {
  const { name, onClick } = props;
  return (
    <li className="city-suggest-li" onClick={() => { onClick(name) }}>{name}</li>
  )
})
export default memo(function (props) {
  // 1.搜索栏的内容 2.选中的回调
  const { searchKey, onSelect } = props
  console.log('searchKey', searchKey);
  const [result, setResult] = useState([])
  // 利用防抖进行优化
  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey)).then(res => res.json())
      .then(res => {
        // result是一个搜索数组
        const { result, searchKey: sKey } = res;
        // 考虑到了延迟和多次发出请求,最后的判断才是返回的数据,避免旧的搜索被显示出来
        if (sKey === searchKey) {
          setResult(result);
        }
      })
  }, [searchKey])
  // 如果没有出来的搜索结果,原封不动的显示出输入的搜索关键词,这里为什么可以使用useMemo
  const fallBackResult = useMemo(() => {
    if (!result.length) return [{ display: searchKey }]
    return result
  }, [result, searchKey])

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          fallBackResult.map(item => <SuggestionItem key={item.display} name={item.display} onClick={onSelect} />)
        }
      </ul>
    </div>
  )
})