import { THistory, THistoryAction } from "types";

const HISTORY_KEY = "history";

export const saveToLocalStorage = (action: THistoryAction) => {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  history.unshift(action);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getFromLocalStorage = (): THistory => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
};

export const replaceHistoryInLocalStorage = (history: THistory) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};
