{/* <Custom Turn Start Effect> */}
user._fenShen = undefined;
user._fenShenScore = undefined;
var hScore = 0;
var group = $gameTroop.aliveMembers();
//console.log(group.length + "Group")

  for (var i = 0; i < group.length; ++i) {
    
    var target = group[i];

    if(!target.isStateAffected(32)){

    var score = ((target.barrierPoints()+target.hp)/target.mhp+0.5);//[0.5,2.5]
    score = score * (5-target.row()) //[1,4]
    
    //console.log(target._enemyId); [0.5,1.5]
    if(healers.contains(target._enemyId)) score = score / 2;
    if(assas.contains(target._enemyId)) score = score / 1.5;
    if(tanks.contains(target._enemyId)) score = score * 1.5;
    
    
    // console.log(target)
    // console.log(score)

    //console.log(score);
    if (score > hScore) {
      user._fenShen = target;
      user._fenShenScore = score;
      hScore = score;
    }
    }
  }
// console.log(user._fenShen)
// console.log(user._fenShenScore)

{/* <Custom Turn Start Effect></Custom> */}