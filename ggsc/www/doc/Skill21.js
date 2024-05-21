
{/* <Row Only: 4> */}

{/* <Before Eval> */}
dmg = user.mat*1;
ba = target.barrierPoints();
if(ba>=dmg){
target.loseBarrier(dmg);}
else{
target.loseBarrier(ba);
target.gainHp(ba-dmg);
}

target.startDamagePopup();
user.gainHp(user.mat*1*user.rec)
user.startAnimation(152);
user.startDamagePopup();
target.addState(32)

// </Before Eval>


{/* <Custom Target Eval>  */}
if(user.isEnemy() && user._fenShen!==undefined){
    targets.push(user._fenShen);
}
// else{targets.push(target);}

</Custom Target Eval>

