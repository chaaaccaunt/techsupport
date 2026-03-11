import { computed, reactive } from "vue";
import {
  loadRouteData,
  loadStaticCatalogs,
  RouteDataKey,
  RouteDataMap,
  StaticCatalogs,
} from "./appDataService";

interface AppDataState {
  staticCatalogs: StaticCatalogs | null;
  staticLoaded: boolean;
  staticLoading: boolean;
  routeData: Partial<RouteDataMap>;
  routeLoading: Partial<Record<RouteDataKey, boolean>>;
  routeLoaded: Partial<Record<RouteDataKey, boolean>>;
}

const state = reactive<AppDataState>({
  staticCatalogs: null,
  staticLoaded: false,
  staticLoading: false,
  routeData: {},
  routeLoading: {},
  routeLoaded: {},
});

async function ensureStaticCatalogs() {
  if (state.staticLoaded || state.staticLoading) {
    return;
  }

  state.staticLoading = true;

  try {
    state.staticCatalogs = await loadStaticCatalogs();
    state.staticLoaded = true;
  } finally {
    state.staticLoading = false;
  }
}

async function ensureRouteData(key: RouteDataKey) {
  if (state.routeLoaded[key] || state.routeLoading[key]) {
    return;
  }

  state.routeLoading = { ...state.routeLoading, [key]: true };

  try {
    const payload = await loadRouteData(key);
    state.routeData = { ...state.routeData, [key]: payload };
    state.routeLoaded = { ...state.routeLoaded, [key]: true };
  } finally {
    state.routeLoading = { ...state.routeLoading, [key]: false };
  }
}

export function useAppData() {
  const staticCatalogs = computed(() => state.staticCatalogs);
  const routeData = computed(() => state.routeData);
  const routeLoaded = computed(() => state.routeLoaded);

  return {
    staticCatalogs,
    routeData,
    routeLoaded,
    ensureStaticCatalogs,
    ensureRouteData,
  };
}
