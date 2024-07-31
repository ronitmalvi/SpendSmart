import React from 'react'
import { Form } from 'react-router-dom'
import {UserPlusIcon} from '@heroicons/react/24/solid'

import illustration from '../assets/illustration.jpg'
function Intro() {
  return (
    <div className='intro'>
      <div>
        <h1>
            Take Control Of <span className="accent">Your Money</span>
        </h1>
        <p>
            Personal Budgeting is the secret to financial freedom. Start your journey today.
        </p>
        {/* this form submits to the dashboard by default because no action is designated */}
        <Form method='post'>
            <input type="text" name='userName' required placeholder='What is your Name?' aria-label='Your Name' autoComplete='given-name'/>
            <input type="hidden" name="_action" value="newUser" />
            <button type='submit' className='btn btn--dark'>
                <span>Create Account</span>
                <UserPlusIcon width={20}/>
            </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600}/>
    </div>
  )
}

export default Intro
