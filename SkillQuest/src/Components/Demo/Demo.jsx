import React from 'react'
import './Demo.css'

export const Demo = () => {
  return (
    <div className="DemoLayer" id='demo'>
      <div className="DemoLayer-header">Demo Chat</div>
      <div className="DemoLayer-messages">
        <p><strong>Bot:</strong> Hi there! What do you want to learn today?</p>
      </div>
      <div className="DemoLayer-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  )
}
