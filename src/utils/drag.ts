

export default class Drag {
  drag: Element | undefined;
  target: Element | undefined;
  startX: number = 0;
  endX: number = 0;
  originWidth: number = 0;
  
  constructor(drag: Element | undefined,target: Element | undefined) {
    this.drag = drag;
    this.target = target
    this.setup()
  }
  
  setup() {
    if(!this.drag || !this.target) return
    window.addEventListener('mousedown', this.startMove) 
    window.addEventListener('dragstart', this.dragstart) 
  }

  dragstart = (e: DragEvent) => {
    e.preventDefault()
    this.end()
  }

  destroy() {
    window.removeEventListener('dragstart', this.dragstart) 
    window.removeEventListener('mousedown', this.startMove) 
    window.removeEventListener('mousemove',this.move)
    window.removeEventListener('mouseup', this.end) 
  }

  startMove = (e: MouseEvent) => {
    if(e.target !== this.drag) return 
    this.startX = e.pageX
    this.originWidth = parseInt(window.getComputedStyle(this.target!).width)
    window.addEventListener('mousemove', this.move)
    window.addEventListener('mouseup', this.end)
  }

  move = (e: MouseEvent) => {
    if(this.startX <= 0) return 
    let width = this.originWidth -  (e.pageX - this.startX)
    if(width < 320) width = 320;
    if(width > 450) width = 450;
    window.requestAnimationFrame(() => {
      (this.target as any).style.width = width + 'px'
    })
  }
  end = () => {
    this.startX = 0
    window.removeEventListener('mousemove',this.move)
    window.removeEventListener('mouseup', this.end)
  }
}