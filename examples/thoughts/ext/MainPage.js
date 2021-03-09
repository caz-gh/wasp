import React, { useState, useRef } from 'react'
import waspLogo from './waspLogo.png'
import './Main.css'

import getThoughts from '@wasp/queries/getThoughts'
import createThought from '@wasp/actions/createThought'
import { useQuery } from '@wasp/queries'

// TODO:
//   - Sort thoughts from the newest to oldest.
//   - By default focus should be on the Thought textarea.
//   - Use markdown. Show markdown preview at the same spot where Thought will appear once it is done.
//   - Add support for tags (#sometag). One Thought can have any number of tags. Can it be untagged?
//   - On the left, show list of the latest tags (latest meaning thought was added with such tag lately).
//     Give them nice colors, persistent colors (calculated from the hash?).
//     Also, allow searching/filtering through them.
//   - Allow hierarhical tags -> tags with '.' in them are "magical".
//     So, if Thought has #haskell and #haskell.exceptions tags, only #haskell tag
//     will be visible on the left side, while #haskell.exceptions tag will be shown as an "exceptions" tag
//     under the #haskell tag.
//   - When tag on the left is clicked, only thoughts with that tag are shown, and new thought is automatically assigned that tag -> so we are filtering the whole view through that tag.

const MainPage = ({ user }) => {
  const { data: thoughts, isFetching, error } = useQuery(getThoughts)

  return (
    <div class="main-page">
      <div class="top-navbar">
        Hi { user.email }
      </div>

      <div class="main-container">
        <div>
          <NewThoughtForm />
        </div>
        <div>
          {thoughts && <ThoughtsList thoughts={thoughts} />}
          {isFetching && 'Fetching...'}
          {error && 'Error: ' + error}
        </div>
      </div>
    </div>
  )
}

const Thought = (props) => (
  <div class="thought">
    {props.thought.text}
  </div>
)

const ThoughtsList = (props) => {
  if (!props.thoughts?.length) return 'What are you thinking?'
  return props.thoughts.map((thought, idx) => <Thought thought={thought} key={idx} />)
}

const NewThoughtForm = (props) => {
  const defaultText = ''
  const [text, setText] = useState(defaultText)
  const formRef = useRef(null)

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      try {
        await createThought({ text })
        setText(defaultText)
      } catch (err) {
        window.alert('Error: ' + err.message)
      }
    }
  }

  return (
    <div class="new-thought-form">
      <form ref={formRef}>
        <textarea
          rows="12"
          cols="60"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </form>
    </div>
  )
}


export default MainPage
