import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Home'
import View from './View'


export default function RouterContainer() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/view' element={<View />}></Route>

                </Routes>
            </BrowserRouter>

        </>
    )
}
