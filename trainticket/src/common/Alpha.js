import React, { memo } from 'react';
/**
 * 字母表
 */
export const AlphaIndex = memo((props) => {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => { onClick(alpha) }}>{alpha}</i>
  )
})
/**
 * 字母表数组
 */
export const alphaBet = Array.from(new Array(26), (ele, index) => String.fromCharCode(65 + index))