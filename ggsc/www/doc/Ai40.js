//核心低 70保核
//自身低+tp低 70撤退至4

//核心中or tp足 or 30 回线上
//花草护体
//战斗技



Eval (user._heXing!==undefined && user._heXing.hpRate()<=0.3 && user.tp>=30 && Math.random()<0.7): Skill 60

Eval (user._heXing!==undefined && user.hpRate()<=0.3 && user.tp<=70 && Math.random()<0.7): Skill 60,

Eval ((user._heXing!==undefined && user._heXing.hpRate()>=0.3) || user.hpRate()>=0.5 || (user.tp>=70 && Math.random()<0.5) || Math.random()<0.3): SKILL 64

Eval (user._heXing!==undefined && user._heXing.hpRate()<=0.3): Skill 10, Highest CORE

Always: Skill 9,

Always: Skill 1