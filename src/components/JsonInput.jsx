import React, {useState} from 'react'
import {parseJsonSafe} from '../utils/jsonUtils.js'
import sample1 from '../utils/sampleJson.js'

export default function JsonInput({jsonText,setJsonText,setParsed,setNodes,setEdges,setMatchMessage}){
  const [error,setError] = useState('')

  const onVisualize = () => {
    setError('')
    setMatchMessage('')
    const {value, error:err} = parseJsonSafe(jsonText)
    if(err){
      setError(err.message)
      setParsed(null)
      setNodes([])
      setEdges([])
      return
    }
    setParsed(value)
    import('../utils/treeUtils.js').then(mod=>{
      const {buildTreeNodes} = mod
      const {nodes, edges} = buildTreeNodes(value)
      setNodes(nodes)
      setEdges(edges)
    })
  }

  const onSample = () => {
    setJsonText(sample1)
  }

  const onClear = () => {
    setJsonText('')
    setParsed(null)
    setNodes([])
    setEdges([])
    setError('')
    setMatchMessage('')
  }

  return (
    <div className="card">
      <label style={{display:'block',fontWeight:600, marginBottom:8}}>Paste JSON</label>
      <textarea value={jsonText} onChange={e=>setJsonText(e.target.value)} style={{width:'100%',height:220,padding:8,resize:'vertical'}}/>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button onClick={onVisualize}>Visualize</button>
        <button onClick={onSample}>Use Sample</button>
        <button onClick={onClear}>Clear</button>
      </div>
      {error && <div style={{marginTop:8,color:'crimson'}}>{error}</div>}
    </div>
  )
}
