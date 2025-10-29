import html2canvas from 'html2canvas'

export default function Toolbar({ rfInstance }) {
  const handleDownload = async () => {
    const reactFlowElement = document.querySelector('.react-flow')
    if (!reactFlowElement) return

    try {
      const canvas = await html2canvas(reactFlowElement, {
        backgroundColor:
          getComputedStyle(document.body).backgroundColor || '#ffffff',
        scale: 2,
      })

      const link = document.createElement('a')
      link.download = 'tree.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error capturing tree:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <button onClick={() => rfInstance?.zoomIn?.()}>Zoom In</button>
      <button onClick={() => rfInstance?.zoomOut?.()}>Zoom Out</button>
      <button onClick={() => rfInstance?.fitView?.({ padding: 0.2 })}>
        Fit
      </button>
      <button onClick={handleDownload}>Download Tree</button>
    </div>
  )
}
