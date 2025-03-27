// import example from "./example.svg";

export { default as ScanIcon } from "./Scan.svg";
export { default as HistoryIcon } from "./History.svg";
export { default as SettingsIcon } from "./Settings.svg";

export { default as SearchIcon } from "./Search.svg";
export { default as GlassesIcon } from "./Glasses.svg";
export { default as PlayIcon } from "./Play.svg";
export { default as CloseIcon } from "./Close.svg";

const icons = {} as const;

export default icons;

export type IconName = keyof typeof icons;
