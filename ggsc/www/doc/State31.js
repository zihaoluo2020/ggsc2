
{/* <Custom Apply Effect> */}

if(user._stockpile === undefined) {user._stockpile = 0;}

if(origin.luk>=2){
user._stockpile += 4;}
else{user._stockpile += 1;}


if(origin.luk>=5){
user._stockpile = Math.min(user._stockpile, 16);}
else{user._stockpile = Math.min(user._stockpile, 8);}

user.setStateCounter(31, user._stockpile);
// </Custom Apply Effect>



{/* <Custom Action End Effect> */}
if(origin.luk>=3&&origin.isAlive()){
origin.gainTp(5*user._stockpile);
origin.startAnimation(151);
origin.startDamagePopup();
}  

  
// </Custom Action End Effect>

{/* <Custom Respond Effect> */}
if(origin.luk>=6&&origin.isAlive()){
if(target.hp===0){

target.removeState(31);

if(user.isEnemy()){allies=$gameParty}
else{allies=$gameTroop}

for (var i = 0; i < allies.aliveMembers().length; ++i) {
var member = allies.aliveMembers()[i];
member.addState(31);
member.startAnimation(165);
}

}
}
// </Custom Respond Effect>

{/* <Custom Remove Effect> */}
user._stockpile = undefined;
user.setStateCounter(31, 0);
user.removeState(31)
{/* </Custom Remove Effect> */}