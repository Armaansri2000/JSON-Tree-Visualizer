import React, { useCallback } from 'react'
import ReactFlow, { Background } from 'reactflow'
import 'reactflow/dist/style.css'

export default function TreeView({ nodes, edges, setRfInstance, theme, setMatchMessage }) {
  const onInit = useCallback((rfi) => {
    setRfInstance(rfi)
  }, [setRfInstance])

  const onNodeClick = useCallback((_, node) => {
    const path = node.data?.path
    navigator.clipboard?.writeText(path)
    setMatchMessage('Copied: ' + path)
    setTimeout(() => setMatchMessage(''), 2000)
  }, [setMatchMessage])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onInit={onInit}
      onNodeClick={onNodeClick}
      fitView
      nodesDraggable
      nodesConnectable={false}
      style={{
        width: '100%',
        height: '100%',
        background: theme === 'dark' ? '#071126' : '#fff',
      }}
    >
      <Background />
    </ReactFlow>
  )
}
