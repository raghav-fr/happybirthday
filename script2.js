let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  mouseTouchX = 0;
  mouseTouchY = 0;

  init(paper) {

    // ================= MOVE =================
    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      if (this.rotating) {
        const dx = e.clientX - this.mouseTouchX;
        const dy = e.clientY - this.mouseTouchY;
        this.rotation = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    // ================= MOUSE DOWN =================
    paper.addEventListener("mousedown", (e) => {
      e.preventDefault();

      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      // 🔴 CRITICAL FIX — initialize mouse
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;

      // Right click = rotate
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    // ================= MOUSE UP =================
    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

// ================= INIT =================
document.addEventListener("contextmenu", e => e.preventDefault());

const papers = document.querySelectorAll(".paper");
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
