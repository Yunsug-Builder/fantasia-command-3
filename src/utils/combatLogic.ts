// src/utils/combatLogic.ts

export const TOTAL_MANA = 1000;
export const FORBIDDEN_REGEX = /무한|최강|무적|절대|신|불사|파괴|모든/g;

export interface Unit {
  name: string;
  cost: number;
  movement: 'ground' | 'flying';
  attack_type: 'melee' | 'ranged';
  element: 'fire' | 'water' | 'nature' | 'none';
  isCursed: boolean;
  rank: string;
  count: number;
}

export interface BattleResult {
  p1Power: number;
  p2Power: number;
  log: string[];
  winner: 'p1' | 'p2' | 'draw';
}

// 1. Mock AI 파서 (임시 텍스트 분석기)
export const mockAIParse = (prompt: string): Unit => {
  let unit: Unit = {
    name: "알 수 없는 개체",
    cost: 20,
    movement: "ground",
    attack_type: "melee",
    element: "none",
    isCursed: false,
    rank: "B급",
    count: 0
  };

  // 탐욕 감지 (최우선 순위)
  if (FORBIDDEN_REGEX.test(prompt)) {
    return {
      name: "탐욕의 찌꺼기",
      cost: 5, movement: "ground", attack_type: "melee", element: "none",
      isCursed: true, rank: "폐급", count: Math.floor(TOTAL_MANA / 5)
    };
  }

  // 종족 및 등급 파싱
  if (prompt.includes("드래곤") || prompt.includes("마왕")) { unit.cost = 250; unit.rank = "S급"; unit.name = prompt.includes("드래곤") ? "드래곤" : "마왕"; }
  else if (prompt.includes("기사") || prompt.includes("전차")) { unit.cost = 80; unit.rank = "A급"; unit.name = prompt.includes("기사") ? "기사" : "전차"; }
  else if (prompt.includes("슬라임") || prompt.includes("벌레")) { unit.cost = 10; unit.rank = "C급"; unit.name = prompt.includes("슬라임") ? "슬라임" : "벌레"; }
  else { unit.name = "일반 병사"; }

  // 특성 파싱
  if (prompt.includes("날개") || prompt.includes("공중") || prompt.includes("비행")) unit.movement = "flying";
  if (prompt.includes("독침") || prompt.includes("활") || prompt.includes("원거리") || prompt.includes("마법")) unit.attack_type = "ranged";
  
  // 속성 파싱
  if (prompt.includes("화염") || prompt.includes("불")) unit.element = "fire";
  else if (prompt.includes("물") || prompt.includes("얼음")) unit.element = "water";
  else if (prompt.includes("독") || prompt.includes("자연") || prompt.includes("숲")) unit.element = "nature";

  // 수량 산정
  unit.count = Math.max(1, Math.floor(TOTAL_MANA / unit.cost));

  return unit;
};

// 2. 전투 시뮬레이션 엔진
export const calculateBattle = (u1: Unit, u2: Unit): BattleResult => {
  const logs: string[] = [];

  const canU1HitU2 = !(u2.movement === 'flying' && u1.attack_type === 'melee');
  const canU2HitU1 = !(u1.movement === 'flying' && u2.attack_type === 'melee');

  logs.push(`P1 -> P2 공격 ${canU1HitU2 ? '가능' : '불가 (Melee vs Flying)'}`);
  logs.push(`P2 -> P1 공격 ${canU2HitU1 ? '가능' : '불가 (Melee vs Flying)'}`);

  // 속성 상성
  let u1Multiplier = 1.0;
  let u2Multiplier = 1.0;

  if ((u1.element === 'fire' && u2.element === 'nature') ||
      (u1.element === 'nature' && u2.element === 'water') ||
      (u1.element === 'water' && u2.element === 'fire')) {
    u1Multiplier = 1.5;
    logs.push("P1 속성 우위! (x1.5)");
  } else if ((u2.element === 'fire' && u1.element === 'nature') ||
             (u2.element === 'nature' && u1.element === 'water') ||
             (u2.element === 'water' && u1.element === 'fire')) {
    u2Multiplier = 1.5;
    logs.push("P2 속성 우위! (x1.5)");
  }

  // 군집(Swarm) 보너스
  const u1SwarmBonus = u1.count >= 50 ? 1.2 : 1.0;
  const u2SwarmBonus = u2.count >= 50 ? 1.2 : 1.0;
  
  if (u1SwarmBonus > 1.0) logs.push("P1 군집 포위 보너스! (x1.2)");
  if (u2SwarmBonus > 1.0) logs.push("P2 군집 포위 보너스! (x1.2)");

  // 최종 화력 계산 (기초화력 * 속성배율 * 군집보너스)
  const p1Power = canU1HitU2 ? Math.floor((u1.count * (u1.cost / 10)) * u1Multiplier * u1SwarmBonus) : 0;
  const p2Power = canU2HitU1 ? Math.floor((u2.count * (u2.cost / 10)) * u2Multiplier * u2SwarmBonus) : 0;

  let winner: 'p1' | 'p2' | 'draw' = 'draw';
  if (p1Power > p2Power) winner = 'p1';
  else if (p2Power > p1Power) winner = 'p2';

  return { p1Power, p2Power, log: logs, winner };
};
