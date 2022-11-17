import s from "./Header.module.scss";
import classNames from "classnames";
import { useAppStore } from "store/store";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import { TABS } from "constants";

export const Header = () => {
  const { tabUsed, changeTab } = useAppStore((state) => ({
    tabUsed: state.tabUsed,
    changeTab: state.changeTab,
  }));

  return (
    <div className={s.header}>
      <h3 className={s.logo}>
        <FindReplaceIcon className={s.logoIcon} />
        Currency<span className={s.exchange}>Exchange</span>
      </h3>
      <div className={s.navigation}>
        <div
          className={classNames(s.btn, {
            [s.activeBtn]: tabUsed === TABS.CONVERTER,
          })}
          onClick={() => changeTab(TABS.CONVERTER)}
        >
          Currency converter
        </div>

        <div
          className={classNames(s.btn, {
            [s.activeBtn]: tabUsed === TABS.HISTORY,
          })}
          onClick={() => changeTab(TABS.HISTORY)}
        >
          View conversation history
        </div>
      </div>
    </div>
  );
};
