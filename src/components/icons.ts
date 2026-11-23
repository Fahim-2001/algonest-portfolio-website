import type { Icon } from "@phosphor-icons/react";
import {
  AppWindow,
  BookOpenText,
  Brain,
  ChartLineUp,
  Clock,
  CurrencyDollar,
  FlowArrow,
  GearSix,
  Lightbulb,
  Handshake,
  PlugsConnected,
  PresentationChart,
  Robot,
  Stack,
  UsersThree,
  WarningCircle,
  XSquare,
} from "@phosphor-icons/react/dist/ssr";
import type { IncludeIcon, ServiceIcon } from "@/content/capabilities";

/** What each capability includes. Keys live in src/content/capabilities.ts. */
export const INCLUDE_ICONS: Record<IncludeIcon, Icon> = {
  agents: Robot,
  pipelines: FlowArrow,
  predict: ChartLineUp,
  knowledge: BookOpenText,
  apps: AppWindow,
  automation: PlugsConnected,
  insights: PresentationChart,
};

/** The five services. Keys live in src/content/capabilities.ts. */
export const SERVICE_ICONS: Record<ServiceIcon, Icon> = {
  automation: Lightbulb,
  insights: PresentationChart,
  apps: Stack,
  process: GearSix,
  team: UsersThree,
};

/** The three problems in the "reality" section, in order. */
export const REALITY_ICONS: Record<string, Icon> = {
  hire: WarningCircle,
  agency: Clock,
  nocode: XSquare,
};

/** The four "Why AlgoNest" points, in order. */
export const WHY_ICONS: Icon[] = [Handshake, UsersThree, Brain, CurrencyDollar];
