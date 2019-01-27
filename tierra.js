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
    stroke(255);
    if (this.hidden) {
      stroke(144)
      rect(this.x,this.y,scl,scl)
      //image(Block,this.pos.x,this.pos.y,scl,scl);
      if(this.signaled) {
        stroke(255,0,0)
        ellipse(this.x+scl/2,this.y+scl/2,scl);
        //image(Flag,this.pos.x,this.pos.y,scl,scl);
        //if (gameState && this.mine == true) {
          //image(BombW,this.pos.x,this.pos.y,scl,scl);
        //}
        //if (gameState && this.mine == false) {
          //image(FlagN,this.pos.x,this.pos.y,scl,scl);
        //}
      }
    } else {
      if (this.mine) {
        stroke(0)
        ellipse(this.x+scl/2,this.y+scl/2,scl);
        //image(Bomb,this.pos.x,this.pos.y,scl,scl);
      } else {
        rect(this.x,this.y,scl,scl);
        //image(Blank,this.pos.x,this.pos.y,scl,scl);
        if (this.nearBombs != 0) {
          switch(this.nearBombs) {
            case 1:
              text("1",this.x+scl/2,this.y+scl/2)
              //image(Uno,this.pos.x,this.pos.y,scl,scl);
              break;
            case 2:
            text("2",this.x+scl/2,this.y+scl/2)
              //image(Dos,this.pos.x,this.pos.y,scl,scl);
              break;
            case 3:
              text("3",this.x+scl/2,this.y+scl/2)              
              //image(Tres,this.pos.x,this.pos.y,scl,scl);
              break;
            case 4:
              text("4",this.x+scl/2,this.y+scl/2)              
              //image(Cuatro,this.pos.x,this.pos.y,scl,scl);
              break;
            case 5:
              text("5",this.x+scl/2,this.y+scl/2)              
              //image(Cinco,this.pos.x,this.pos.y,scl,scl);
              break;
            case 6:
              text("6",this.x+scl/2,this.y+scl/2)              
              //image(Seis,this.pos.x,this.pos.y,scl,scl);
              break;
            case 7:
              text("7",this.x+scl/2,this.y+scl/2)              
              //image(Siete,this.pos.x,this.pos.y,scl,scl);
              break;
            case 8:
              text("8",this.x+scl/2,this.y+scl/2)              
              //image(Ocho,this.pos.x,this.pos.y,scl,scl);
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
