let handsService = {
  winningHands: async (handsData, callback) => {
    const suits = ['S','H','C','D']
    let pairHands = [], twoPairHands = [], threeOfAKindHands = [], straightHands = [], flushHands = [] 

    const table = handsData.table

    const pair = (cards) => {
      cards.map(card => {      
        suits.map(suit => {
          if (suit != card[1]) {
            pairHands.push([[card[0],suit],[]])
          }
        })      
      })
    }

    const two_pair = (cards) => {
      cards.map((card, idx) => {
        suits.map(suit => {
          if (suit != card[1]) {
            cards.slice(idx+1,cards.length).map(oCard => {
              suits.map(oSuit => {
                if (oSuit != oCard[1]) {
                  twoPairHands.push([[card[0],suit],[oCard[0],oSuit]])
                }
              })
            })
          }
        })
      })
    }

    const three_of_a_kind = (cards) => {
      cards.map(card => {
        let count = 0
        let availableSuits = []
        cards.map(x => {
          if (x[0] === card[0]) { 
            count++
            availableSuits.push(x[1]) 
          }        
        })
        let oSuits = []
        switch (count) {
          case 1: 
            oSuits = suits.filter(x => x != card[1])
            let i = 0
            threeOfAKindHands.push([[card[0],oSuits[0]],[card[0],oSuits[1]]])
            threeOfAKindHands.push([[card[0],oSuits[0]],[card[0],oSuits[2]]])
            threeOfAKindHands.push([[card[0],oSuits[1]],[card[0],oSuits[2]]])
            break
          case 2:
            oSuits = suits.filter(x => !availableSuits.includes(x))
            threeOfAKindHands.push([[card[0],oSuits[0]],[card[0],oSuits[1]]])
            break          
          case 3:
            threeOfAKindHands.push([[],[]])
            break
          default:
            break
        }
      })
    }

    const straight = (cards) => {
      const allSuits = (handVal) => {
        if (!((handVal[0] < 1) || (handVal[0] > 14) || (handVal[1] < 1) || (handVal[1] > 14))) {
          suits.map(suit => {
            suits.map(oSuit => {
              straightHands.push([[handVal[0],suit],[handVal[1],oSuit]])
            })
          })
        }      
      }

      cards.slice(0,cards.length-2).map((card, idx) => {
        cards.slice(idx+1,cards.length-1).map((oCard, oIdx) => {
          cards.slice(oIdx+1,cards.length).map((ooCard, ooIdx) => {
            const triplet = [card[0], oCard[0], ooCard[0]];
            if (triplet.length === new Set(triplet).size) {
              triplet.sort(function(a, b){return a-b});
              let type = triplet[2] - triplet[0]
              if (type === 4) {
                let diff = triplet[2] - triplet[1]
                if (diff === 1) {
                  allSuits([triplet[0]+1,triplet[0]+2])
                } else if (diff === 2) {
                  allSuits([triplet[0]+1,triplet[0]+3])
                } else if (diff === 3) {
                  allSuits([triplet[0]+2,triplet[0]+3])
                }
              } else if (type === 3) {
                let diff = triplet[2] - triplet[1]
                if (diff === 1) {
                  allSuits([triplet[0]-1,triplet[0]+1])
                  allSuits([triplet[0]+1,triplet[0]+4])
                } else if (diff === 2) {
                  allSuits([triplet[0]-1,triplet[0]+2])
                  allSuits([triplet[0]+2,triplet[0]+4])
                }
              } else if (type === 2) {
                allSuits([triplet[0]-1,triplet[0]+3])
                allSuits([triplet[0]-2,triplet[0]-1])
                allSuits([triplet[0]+3,triplet[0]+4])
              }
            }
          })
        })
      })
    }

    const flush = (cards) => {
      let tableSuits = cards.map(card => {
        return card[1]
      })
      const counts = {};
      for (const s of tableSuits) {
        counts[s] = counts[s] ? counts[s] + 1 : 1;
      }
      console.log(counts);

      for (const s of Object.keys(counts)) {
        if (counts[s] > 2) {
          let flushCards = cards.filter(card => card[1] === s)
          let flushCardVals = flushCards.map(card => card[0])
          let availableVals = Array.from(Array(13).keys(), x => x+1)
          availableVals = availableVals.filter (x => !flushCardVals.includes(x))
          availableVals.map((val,idx) => {
            availableVals.slice(idx+1,availableVals.length).map(oVal => {
              flushHands.push([[val,s],[oVal,s]])
            })
          })
          break;
        }
      }
    }

    pair(table)
    two_pair(table)
    three_of_a_kind(table)
    straight(table)
    flush(table)

    callback({ 
      message: 'All possible winning hands for given table.', 
      hands: {
        'Pair': pairHands,
        'Two Pair': twoPairHands,
        'Three of a kind': threeOfAKindHands,
        'Straight': straightHands,
        'Flush' : flushHands
      } 
    })
  }
}

module.exports = handsService;