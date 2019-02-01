class cuadro {
  constructor(x,y,mine) {
    this.i = x;
    this.j = y;
    this.pos = createVector(x*scl,y*scl);
    this.mine = false
    if (mine == true) {
      this.mine = true;
    }
    this.hidden = true;
    this.signaled = false
    this.nearBombs = 0;
    this.visited = false;
    this.checked = false;
    this.clicked = 0;
    this.hiddenBlocks = 0;
    this. nearFlags = 0;
    this.allDone = false;
  }

  show() {
    stroke(144);

    if (this.hidden) {
      stroke(144);
      fill(100);
      image(Block,this.pos.x,this.pos.y,scl,scl);
      if(this.signaled) {
        image(Flag,this.pos.x,this.pos.y,scl,scl);
        if (gameState && this.mine == true) {
          image(BombW,this.pos.x,this.pos.y,scl,scl);
         }
        if (gameState && this.mine == false) {
          image(FlagN,this.pos.x,this.pos.y,scl,scl);
        }
      }
    } else {
      if (this.mine) {
        image(Bomb,this.pos.x,this.pos.y,scl,scl);
      } else {
        image(Blank,this.pos.x,this.pos.y,scl,scl);
        if (this.nearBombs != 0) {
          switch(this.nearBombs) {
            case 1:
              image(Uno,this.pos.x,this.pos.y,scl,scl);
              break;
            case 2:
              image(Dos,this.pos.x,this.pos.y,scl,scl);
              break;
            case 3:
              image(Tres,this.pos.x,this.pos.y,scl,scl);
              break;
            case 4:
              image(Cuatro,this.pos.x,this.pos.y,scl,scl);
              break;
            case 5:
              image(Cinco,this.pos.x,this.pos.y,scl,scl);
              break;
            case 6:
              image(Seis,this.pos.x,this.pos.y,scl,scl);
              break;
            case 7:
              image(Siete,this.pos.x,this.pos.y,scl,scl);
              break;
            case 8:
              image(Ocho,this.pos.x,this.pos.y,scl,scl);
          }
        }
      }
    }
  }

  unhide() {
    if(this.signaled == false && privilegios == true) {
      this.hidden = false
    }

    this.clicked += 1;

    if(this.clicked > 0) {
      for(let i = -1; i <=1; i++) {
        for(let j = -1; j <=1 ; j++) {
          if(i == 0 && j == 0) {
            continue;
          }
          if (this.i == 0  && i == -1) {
            continue;
          }
          if (this.j == 0 && j == -1) {
            continue;
          }
          if (this.i == nxn-1 && i == 1) {
            continue;
          }
          if (this.j == nxn-1 && j == 1) {
            continue;
          }
          let neighbor = cuad[this.i + i][this.j + j]
          if (neighbor != undefined) {
            if (neighbor.signaled && neighbor.checked == false) {
              this.nearFlags += 1;
              neighbor.checked = true;
            }
          }
        }
      }

      if(this.nearFlags == this.nearBombs) {
        for(let i = -1; i <=1; i++) {
          for(let j = -1; j <=1 ; j++) {
            if(i == 0 && j == 0) {
              continue;
            }
            if (this.i == 0  && i == -1) {
              continue;
            }
            if (this.j == 0 && j == -1) {
              continue;
            }
            if (this.i == nxn-1 && i == 1) {
              continue;
            }
            if (this.j == nxn-1 && j == 1) {
              continue;
            }
            let neighbor = cuad[this.i + i][this.j + j]
            if (neighbor != undefined) {
              if (neighbor.signaled == false) {
                // paco.click(neighbor);
                neighbor.hidden = false;
              }
            }
          }
        }
      }


      for(let i = -1; i <=1; i++) {
        for(let j = -1; j <=1 ; j++) {
          if(i == 0 && j == 0) {
            continue;
          }
          if (this.i == 0  && i == -1) {
            continue;
          }
          if (this.j == 0 && j == -1) {
            continue;
          }
          if (this.i == nxn-1 && i == 1) {
            continue;
          }
          if (this.j == nxn-1 && j == 1) {
            continue;
          }
          let neighbor = cuad[this.i + i][this.j + j]
          if (neighbor != undefined) {
            if (neighbor.checked == true) {
              neighbor.checked = false;
            }
          }
        }
      }
    }

    this.nearFlags = 0;
    if(this.clicked == 2000) {
      this.clicked = 1;
    }
  }

  signalSwitch() {
    if (this.signaled == false) {
      this.signaled = true;
    } else {
      this.signaled = false;
    }
  }

  searchNeighbors() {
    for(let i = -1; i <=1; i++) {
      for(let j = -1; j <=1 ; j++) {
        if(i == 0 && j == 0) {
          continue;
        }
        if (this.i == 0  && i == -1) {
          continue;
        }
        if (this.j == 0 && j == -1) {
          continue;
        }
        if (this.i == nxn-1 && i == 1) {
          continue;
        }
        if (this.j == nxn-1 && j == 1) {
          continue;
        }
        let neighbor = cuad[this.i + i][this.j + j]
        if (neighbor != undefined) {
          if (neighbor.mine) {
            this.nearBombs += 1;
          }
        }
      }
    }
  }

  chain() {
    for(let i = -1; i <=1; i++) {
      for(let j = -1; j <=1 ; j++) {
        if(i == 0 && j == 0) {
          continue;
        }
        if (this.i == 0  && i == -1) {
          continue;
        }
        if (this.j == 0 && j == -1) {
          continue;
        }
        if (this.i == nxn-1 && i == 1) {
          continue;
        }
        if (this.j == nxn-1 && j == 1) {
          continue;
        }
        let neighbor = cuad[this.i + i][this.j + j]
        if (neighbor != undefined) {
          if (neighbor.mine == false && this.nearBombs == 0 && this.mine == false && this.signaled == false) {
            if(neighbor.visited == false) {
              neighbor.visited = true
              neighbor.unhide();
              neighbor.chain();
            }
          }
        }
      }
    }
  }
}
