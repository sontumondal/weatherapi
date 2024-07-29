import React, { lazy, Suspense } from 'react'
// import Weather from './Weather'
const Weather=lazy(()=> import ("./Weather"))
const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
    <div className="App">
      <Weather />
    </div>
    </Suspense>
  )
}

export default App
