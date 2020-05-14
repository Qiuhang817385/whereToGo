import React, { memo } from 'react'
import './css/Ticket.css'
export default memo(function Ticket (props) {

  const { type, price } = props
  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{type}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  )
})
