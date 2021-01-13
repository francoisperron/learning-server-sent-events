import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const useEventSource = (url) => {
  const [data, updateData] = useState(null)

  useEffect(() => {
    const source = new EventSource(url)
    source.onmessage = event => updateData(JSON.parse(event.data))
  }, [url])

  return data
}

const App = () => {
  const data = useEventSource('http://localhost:3001/api/data') // does not work with CRA proxy and /api/data
  const [input, setInput] = useState('')

  const sendData = () => {
    axios.post('/api/data', { value: input })
      .then(() => setInput(''))
  }

  return data
    ? <>
      <div>Data {data.value} - {data.updatedAt}</div>
      <input value={input} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={sendData}>Change Data</button>
    </>
    : <div>No data</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
