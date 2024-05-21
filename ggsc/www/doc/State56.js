//AI team HP
{/* <Custom Turn Start Effect> */}
var hpsum=0;
var mhpsum=1;

for(var i=0;i<$gameTroop.aliveMembers().length;i++){
if($gameTroop.aliveMembers()[i]!==user){
hpsum+=$gameTroop.aliveMembers()[i].hp;
mhpsum+=$gameTroop.aliveMembers()[i].mhp;
}
}
user._teamHpRate=hpsum/mhpsum

user._assaTpMax = 0;
for(var i=0;i<$gameParty.aliveMembers().length;i++){
    var tar = $gameParty.aliveMembers()[i];
    if(assas.contains(tar._actorId + 39)){
    console.log(tar);
    user._assaTpMax = Math.max(tar.tp, user._assaTpMax);
    }
    }
console.log(user._assaTpMax);
// </Custom Turn Start Effect>