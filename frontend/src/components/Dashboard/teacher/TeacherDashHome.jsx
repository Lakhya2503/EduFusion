import React from 'react'
import TeacherHomeHero from './TeacherHomeHero'
import { useSelector } from 'react-redux'

function TeacherDashHome() {
  const user = useSelector((state) => state.auth.user)
   
  return (
    <div className="flex text-zinc-800 w-full">
      <TeacherHomeHero user={user} />
    </div>
  )
}

export default TeacherDashHome