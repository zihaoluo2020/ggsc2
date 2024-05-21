//自身低 核心低 50保核 60
//自身高 核心低 100保核 60
//刺客tp足 100% 转移4线 60
//团队hp<60& 80% 转移4线 60
//Tp满 身后无人 90% 转移4线 60
//_huan满 队伍减员 90% 转移4线 60

//自身高>80 + huan不满  70% 前冲1线 57
//自身20-80 80% 转移3线 59
//自身<20 50% 转移4线 60

//刺客TP不足 and 团队hp>60% and 核心>30% and ((自身20-80 + 70rand) or (自身0-20 + 30rand)) 前冲3  64
//降临 ：(刺客TP不足 and 团队hp<60% and ((自身>50 + 70rand) or (自身0-50 + 30rand)) ) or 自身高核心低 or (_huan满 队伍减员)
//普照
//自省




Eval (user.tp>=50 && user.hpRate()<=0.5 && user._heXing!==undefined && user._heXing!==user && user._heXing.hpRate()<=0.5 && Math.random()<0.5): SKILL 60,
Eval (user.tp>=50 && user.hpRate()<=1 && user._heXing!==undefined && user._heXing!==user && user._heXing.hpRate()<=0.5 && Math.random()<1): SKILL 60,
Eval (user._assaTpMax!==undefined && user._assaTpMax>=90): SKILL 60,
Eval (user.tp>=50 && user._teamHpRate!==undefined && user._teamHpRate<=0.6 && user.hpRate()>=0.4 && Math.random()<0.8): SKILL 60,
Eval (user.tp>=100 && $gameTroop.rowSize(3)+$gameTroop.rowSize(4)<=1 && Math.random()<0.9): SKILL 60,
Eval (user._huan>=1000 &&  $gameTroop.deadMembers().length>0 && Math.random()<0.9): SKILL 60,


Eval (user.hpRate()>=0.8 && user._huan<1000): SKILL 57
Eval (user.hpRate()>=0.2 && user.hpRate()<=0.8): SKILL 59
Eval (user.hpRate()<0.2): SKILL 60

Eval (user._assaTpMax!==undefined && user._assaTpMax<90 && user._teamHpRate>=0.6 && user._heXing.hpRate()>=0.4 && ((user.hpRate()>0.2 && Math.random()<0.7) || (user.hpRate()>0.8 && Math.random()<0.3))): SKILL 64,

Eval ((user.tp>=50 && user.hpRate()>=0.5 && user._heXing!==undefined && user._heXing!==user && user._heXing.hpRate()<=0.5) || (user._huan>=1000 &&  $gameTroop.deadMembers().length>0) || (((user.hpRate()>0.5 && Math.random()<0.7) || (user.hpRate()<0.5 && Math.random()<0.3)) && user._assaTpMax<100 && user._teamHpRate<0.6)): SKILL 29,

Always: SKILL 27,  
Always: SKILL 30,  
