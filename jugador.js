class Player {
  constructor(numPlayer) {
    this.pos = createVector(45,42);
    //this.pos = createVector( floor(random(0,rows)) , floor(random(0,cols)) );
    this.prevpos = this.pos;
    this.mind = "safe";
    this.hiddenBlocks = 0
    this.flagsAround = 0;
    this.delay = 0
    this.numPlayer = numPlayer;
  }

  click(block) {
    if (block.allDone == false) {
      block.unhide()
      block.chain()
    }
  }
  flagIt(block) {
    if(block.hidden == true){
      block.signaled = true;
    }
  }

  guess() {
    this.prevpos = this.pos
    this.learn();
    if (this.numPlayer) {
      stroke(0)
      ellipse(this.x+scl/2,this.y+scl/2,slc/2)
      //image(poiner,this.pos.x*scl+scl/4,this.pos.y*scl+scl/4,scl,scl);
    } else {
      stroke(0)
      ellipse(this.x+scl/2,this.y+scl/2,slc/2)      
      //image(poiner2,this.pos.x*scl+scl/4,this.pos.y*scl+scl/4,scl,scl);
    }
    paco.click(cuad[this.pos.x][this.pos.y]);
    cuad[this.pos.x][this.pos.y].clicked += 1;

    if (this.prevpos == this.pos) {
      this.delay += 1;
      if (this.hiddenBlocks == 8 && this.delay == 50) {
       let pos2
       while(true) {
         pos2 = createVector(this.pos.x + floor(random(-1,1)),this.pos.y + floor(random(-1,1)))
         if (pos2.x > 0 && pos2.x < rows && pos2.y > 0 && pos2.y < cols) {
           if (cuad[pos2.x][pos2.y].hidden == true && cuad[pos2.x][pos2.y].allDone == false) {
               break;
           }
         }
       }
       this.pos = pos2
       this.delay = 0;
     }
      if (this.prevpos == this.pos && this.delay % 2 == 0) {
        let pos2;
        while(true) {
          pos2 = createVector(floor(random(0,rows)),floor(random(0,cols)))
          if (cuad[pos2.x][pos2.y].nearBombs != 0 && cuad[pos2.x][pos2.y].hidden == false && cuad[pos2.x][pos2.y].allDone == false) {
            break;
          }
        }
        this.pos = pos2
        for(let i = 0; i < rows; i++) {
          for(let j = 0; j < cols; j++) {
            if (cuad[i][j].nearBombs != 0) {
              cuad[i][j].clicked = 1
            }
          }
        }
      }
    }
    this.hiddenBlocks = 0;
  }

  learn() {
    let neighbor;
    let boolean;

    for(let i = -1; i <=1; i++) {
      for(let j = -1; j <=1 ; j++) {
        if(i == 0 && j == 0) {
          continue;
        }
        if (this.pos.x == 0  && i == -1) {
          continue;
        }
        if (this.pos.y == 0 && j == -1) {
          continue;
        }
        if (this.pos.x == nxn-1 && i == 1) {
          continue;
        }
        if (this.pos.y == nxn-1 && j == 1) {
          continue;
        }
        neighbor = cuad[this.pos.x + i][this.pos.y + j]
        if(neighbor.hidden == true) {
          this.hiddenBlocks += 1;
        }
      }
    }

    if(cuad[this.pos.x][this.pos.y].nearBombs == this.hiddenBlocks) {
      for(let i = -1; i <=1; i++) {
        for(let j = -1; j <=1 ; j++) {
          if(i == 0 && j == 0) {
            continue;
          }
          if (this.pos.x == 0  && i == -1) {
            continue;
          }
          if (this.pos.y == 0 && j == -1) {
            continue;
          }
          if (this.pos.x == nxn-1 && i == 1) {
            continue;
          }
          if (this.pos.y == nxn-1 && j == 1) {
            continue;
          }
          neighbor = cuad[this.pos.x + i][this.pos.y + j]
          this.flagIt(neighbor);
        }
      }
    }
    // console.log(this.hiddenBlocks);
    // this.hiddenBlocks = 0;

    // if (this.pos.x == 0 || this.pos.y == 0) {
    //   this.pos.x = floor(random(0,rows))
    //   this.pos.y = floor(random(0,cols))
    // }
    for(let i = -1; i <=1; i++) {
      for(let j = -1; j <=1 ; j++) {
        if(i == 0 && j == 0) {
          continue;
        }
        if (this.pos.x == 0  && i == -1) {
          continue;
        }
        if (this.pos.y == 0 && j == -1) {
          continue;
        }
        if (this.pos.x == nxn-1 && i == 1) {
          continue;
        }
        if (this.pos.y == nxn-1 && j == 1) {
          continue;
        }
        neighbor = cuad[this.pos.x + i][this.pos.y + j]
        if (neighbor != undefined) {
          if(neighbor.signaled == true) {
            this.flagsAround += 1;
          }
        }
      }
    }
    if (this.flagsAround == cuad[this.pos.x][this.pos.y].nearBombs) {
      for(let i = -1; i <=1; i++) {
        for(let j = -1; j <=1 ; j++) {
          if(i == 0 && j == 0) {
            continue;
          }
          if (this.pos.x == 0  && i == -1) {
            continue;
          }
          if (this.pos.y == 0 && j == -1) {
            continue;
          }
          if (this.pos.x == nxn-1 && i == 1) {
            continue;
          }
          if (this.pos.y == nxn-1 && j == 1) {
            continue;
          }
          neighbor = cuad[this.pos.x + i][this.pos.y + j]
          if (neighbor != undefined) {
            if(neighbor.signaled == false) {
              this.click(neighbor);
              // neighbor.hidden = false;
            }
          }
        }
      }
    }


    if (this.flagsAround == cuad[this.pos.x][this.pos.y].nearBombs) { //&& this.hiddenBlocks == 8-cuad[this.pos.x][this.pos.y].nearBombs) {
      cuad[this.pos.x][this.pos.y].allDone = true;
    }


    if(this.flagsAround != 0) {
      for(let i = -1; i <=1; i++) {
        for(let j = -1; j <=1 ; j++) {
          if(i == 0 && j == 0) {
            continue;
          }
          if (this.pos.x == 0  && i == -1) {
            continue;
          }
          if (this.pos.y == 0 && j == -1) {
            continue;
          }
          if (this.pos.x == nxn-1 && i == 1) {
            continue;
          }
          if (this.pos.y == nxn-1 && j == 1) {
            continue;
          }
          neighbor = cuad[this.pos.x + i][this.pos.y + j]
          if (neighbor != undefined) {
            if (neighbor.hidden == false && neighbor.clicked < 3 && neighbor.allDone == false) {
              this.pos.x = neighbor.i;
              this.pos.y = neighbor.j;
              boolean = true;
              break;
            }
          }
        }
        if(boolean == true) {
          boolean = false;
          break;
        }
      }
    }
    // }else {
    //   let pos2 = createVector(0,0);
    //   while(true) {
    //     pos2 = createVector(this.pos.x + floor(random(-2,2)),this.pos.y + floor(random(-2,2)))
    //     if(pos2.x >= 0 && pos2.x <= rows-1 && pos2.y >=0 && pos2.y <= cols-1) {
    //       break;
    //     }
    //   } //while(cuad[pos2.x][pos2.y] == undefined)
    //   this.pos = pos2;
    // }
    this.flagsAround = 0;
    // this.hiddenBlocks = 0;
  }
}
