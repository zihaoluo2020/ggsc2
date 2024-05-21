//AI 判定阵容核心 
//<Custom Turn Start Effect>



user._heXing = undefined;
var hScore = 0;
var group = $gameTroop.aliveMembers();

  for (var i = 0; i < group.length; ++i) {
    
    var target = group[i];

    

    var score = Math.max(target.atk,target.mat, target.def, target.mdf);
    
    //console.log(target._enemyId);
    if(healers.contains(target._enemyId)) score = score * 2;
    if(assas.contains(target._enemyId)) score = score / 1.5;
    
    score = score * (1.5 - target.hp / target.mhp);
    //console.log(score);
    if (score > hScore) {
      user._heXing = target;
      hScore = score;
    }
  
  }


//</Custom Turn Start Effect>

