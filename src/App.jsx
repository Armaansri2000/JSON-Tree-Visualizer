import React, { useState } from 'react'
import JsonInput from './components/JsonInput.jsx'
import TreeView from './components/TreeView.jsx'
import SearchBar from './components/SearchBar.jsx'
import Toolbar from './components/Toolbar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import './styles/App.css'

export default function App(){
  const [jsonText, setJsonText] = useState(`{
  "user": {
    "name": "Alice",
    "age": 30,
    "address": { "city": "Wonderland", "zip": "12345" }
  },
  "items": [
    { "name": "Item A", "price": 9.99 },
    { "name": "Item B", "price": 14.5 }
  ]
}`)
  const [parsed, setParsed] = useState(null)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [rfInstance, setRfInstance] = useState(null)
  const [matchMessage, setMatchMessage] = useState('')
  const [theme, setTheme] = useState('light')

  return (
    <div className="app-container">
      <div className="header">
        <h1>JSON Tree Visualizer</h1>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
          <Toolbar rfInstance={rfInstance}/>
        </div>
      </div>

      <div className="columns">
        <div>
          <JsonInput
            jsonText={jsonText}
            setJsonText={setJsonText}
            setParsed={setParsed}
            setNodes={setNodes}
            setEdges={setEdges}
            setMatchMessage={setMatchMessage}
          />
          <div style={{marginTop:12}}>
            <SearchBar nodes={nodes} rfInstance={rfInstance} setMatchMessage={setMatchMessage}/>
          </div>
          <div style={{marginTop:12}} className="card">
            <p style={{margin:0,fontSize:13,color:'var(--muted)'}}>Click a node in the tree to copy its JSON path. Use sample JSON from dropdown for quick testing.</p>
            {matchMessage && <div style={{marginTop:8,color:'var(--text)'}}>{matchMessage}</div>}
          </div>
        </div>

        <div className="card" style={{height:'720px', padding:0}}>
          <TreeView
            nodes={nodes}
            edges={edges}
            setRfInstance={setRfInstance}
            theme={theme}
            setMatchMessage={setMatchMessage}
          />
        </div>
      </div>

      <div className="footer">Tip: Search using a full JSON path like <code>$.user.address.city</code> or <code>$.items[0].name</code>.</div>
    </div>
  )
}
