

//刺客TP不足 and 团队hp>60% and 核心>30% and ((自身20-80 + 70rand) or (自身0-20 + 30rand)) 前冲3  64
//降临 ：(刺客TP不足 and 团队hp<60% and ((自身>50 + 70rand) or (自身0-50 + 30rand)) ) or 自身高核心低 or (_huan满 队伍减员)
//普照
//自省




Eval (user.mp>=15 || (user._assaTpMax!==undefined && user._assaTpMax>=90)): SKILL 60,

Eval (user.mp<15 && (user._assaTpMax!==undefined && user._assaTpMax<90)): SKILL 64,

RANDOM 80% +++ STATE !== state 41: SKILL 8, Lowest HP%

Always: SKILL 11,  
Always: SKILL 1,  
