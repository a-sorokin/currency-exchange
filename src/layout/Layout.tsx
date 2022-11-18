import s from "./Layout.module.scss";
import { Header } from "features/Header/Header";
import { useAppStore } from "store/store";
import { Converter } from "features/Converter/Converter";

export const Layout = () => {
  const tabUsed = useAppStore((state) => state.tabUsed);

  return (
    <div className={s.wrapper}>
      <div className={s.layout}>
        <div className={s.header}>
          <div className={s.headerContent}>
            <Header />
          </div>
        </div>
      </div>
      <div className={s.content}>
        {tabUsed === "converter" && <Converter />}
        {tabUsed === "history" && <div>History</div>}
      </div>
    </div>
  );
};
