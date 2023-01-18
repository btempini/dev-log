import React from 'react'
import './styles/userfeed.css'

function userfeed() {
  return (
    // user feed
    <div>
        {/* profile image */}
        <img />
        {/* profile button */}
        <btn></btn>
          {/* choose if you want to see your friends feed or all posts feed */}
        <section>
            <btn>local scope</btn>
            <btn>global scope</btn>
        </section>
        {/* local scope feed */}
        <section>
          {/* Post Title */}
          <h3></h3>
          {/* Date the post was created */}
          <h3></h3>
          {/* image of the user */}
          {/* <img></img> */}
          {/* post body */}
          <p></p>
        </section>
        {/* global scope feed */}
        <section>
          {/* Post Title */}
          <h3></h3>
          {/* Date the post was created */}
          <h3></h3>
          {/* image of the user */}
          {/* <img></img> */}
          {/* post body */}
          <p></p>
        </section>
    </div>
  )
}

export default userfeed