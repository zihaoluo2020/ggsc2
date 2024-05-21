//焚身>3 30后撤
//焚身>2 20后撤
//自身低+tp低 70 撤退至4
//焚身<2 or tp足 or hp足 or 30 回线上

//焚身>2 焚身
//战斗技



Eval (user._fenShen!==undefined && user._fenShenScore>=3 && user.tp>=30 && Math.random()<0.3): Skill 60
Eval (user._fenShen!==undefined && user._fenShenScore>=2 && user.tp>=30 && Math.random()<0.2): Skill 60

Eval (user.hpRate()<=0.3 && user.tp<=70 && Math.random()<0.7): Skill 60,

Eval ((user._fenShen!==undefined && user._fenShenScore<2) || user.tp>=70 || user.hpRate()>=0.3 || Math.random()<0.3): SKILL 64

Eval (user._fenShen!==undefined && user._fenShenScore>=2): Skill 21,

Always: Skill 20,

Always: Skill 1