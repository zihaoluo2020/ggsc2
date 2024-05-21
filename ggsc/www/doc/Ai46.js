//自身低 核心低 100保核
//自身低 核心高 50保核
//自身高 核心低 70保核

Eval (user._bless!==undefined): Skill 33,
Eval (user._bless===undefined && user.tp>=50 && user.hpRate()<=0.5 && $gameTroop.aliveMembers().length>1 && user._heXing!==undefined && user._heXing!==user && user._heXing.hpRate()<=0.5 && Math.random()<1): SKILL 60,
Eval (user._bless===undefined && user.tp>=50 && user.hpRate()<=0.5 && $gameTroop.aliveMembers().length>1 && user._heXing!==undefined && user._heXing!==user && user._heXing.hpRate()<=0.7 && Math.random()<0.5): SKILL 60,
Eval (user._bless===undefined && user.tp>=50 && user.hpRate()<=0.7 && $gameTroop.aliveMembers().length>1 && user._heXing!==undefined && user._heXing!==user && user._heXing.hpRate()<=0.5 && Math.random()<0.7): SKILL 60,

Eval (user._bless===undefined && user.tp>=50 && $gameTroop.aliveMembers().length>1): SKILL 31, Highest CORE
Always: SKILL 62
Always: Skill 1