import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ghulam Shubhani</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is test {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and savenfiiii8898888i0000f0000jgfghjdf to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to le0000a000rn more
      </p>
    </>
  )
}

export default App
