

import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Home } from '../Pages/Home'
import { Contacts } from '../Pages/Contacts'
import { AddContact } from '../Pages/AddContact'

export const Routes1 = () => {
  return (
    <Routes>
<Route path='/' element={<Home/>}  />
<Route path="/contacts"element={<Contacts/>}/>
<Route path="/AddContact" element={<AddContact/>}/>
    </Routes>
  )
}
