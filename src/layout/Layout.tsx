import s from "./Layout.module.scss";
import { Header } from "features/Header/Header";
import { useAppStore } from "store/store";
import { Converter } from "features/Converter/Converter";
import { ConversionHistory } from "features/ConversionHistory/ConversionHistory";

export const Layout = () => {
  const tabUsed = useAppStore((state) => state.tabUsed);

  return (
    <>
      <header className={s.header}>
        <div className={s.headerContent}>
          <Header />
        </div>
      </header>

      <main className={s.content}>
        {tabUsed === "converter" && <Converter />}
        {tabUsed === "history" && <ConversionHistory />}
      </main>
    </>
  );
};
