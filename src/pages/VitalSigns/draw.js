export let Draw = {
  initCtx(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
  },
  drawLine(x1, y1, x2, y2, { lineWidth = 1, strokeColor = '#ccc', isDashed = false, sgements = [10, 4] } = {}) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeColor;
    isDashed ? this.ctx.setLineDash(sgements) : this.ctx.setLineDash([]);

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  },
  drawText(x, y, txt, { r = 3, fillColor = '#5080f6' } = {}) {
    this.ctx.beginPath();
    this.ctx.font = 'Normal 10px Microsoft YaHei';
    this.ctx.fillStyle = fillColor;
    this.ctx.fillText(txt, x, y);
  },
  drawPoint(x, y, { r = 3, strokeColor = '#5080f6', fillColor = '#5080f6' } = {}) {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor ? strokeColor : fillColor;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }
};
