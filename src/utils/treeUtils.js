function typeOf(value){
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'object'
  return 'primitive'
}

export function buildTreeNodes(json){
  const nodes = []
  const edges = []
  let counter = 0
  const V_GAP = 90
  const H_GAP = 220

  function walk(value,path,depth){
    const id = path
    const t = typeOf(value)
    const y = counter * V_GAP
    counter++
    let label = ''
    if(t==='object') label = path==='$' ? 'root: object' : `${path.split('.').pop()}: {}`
    else if(t==='array') label = `${path.split('.').pop()}: []`
    else label = `${path.split('.').pop()}: ${String(value)}`

    nodes.push({
      id,
      data: { label, path, value },
      position: { x: depth * H_GAP, y },
      style: typeStyle(t)
    })

    if(t==='object'){
      Object.keys(value).forEach(k=>{
        const child = `${path}.${k}`
        edges.push({ id: `${id}->${child}`, source:id, target: child })
        walk(value[k], child, depth+1)
      })
    } else if(t==='array'){
      value.forEach((it,i)=>{
        const child = `${path}[${i}]`
        edges.push({ id:`${id}->${child}`, source:id, target: child })
        walk(it, child, depth+1)
      })
    }
  }

  function typeStyle(t){
    if(t==='object') return { background: 'var(--accent-object)', color:'#fff', padding:10, borderRadius:8, width:200 }
    if(t==='array') return { background: 'var(--accent-array)', color:'#fff', padding:10, borderRadius:8, width:200 }
    return { background: 'var(--accent-primitive)', color:'#222', padding:10, borderRadius:8, width:200 }
  }

  walk(json,'$',0)
  return {nodes, edges}
}
