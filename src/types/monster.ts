export interface Monster {
  id: string;
  icon?: string;
  name?: string;
  subtitle?: string;
  requiredCombatLevel?: number;
  locations: string[];
  notableDrops?: string[];
}
