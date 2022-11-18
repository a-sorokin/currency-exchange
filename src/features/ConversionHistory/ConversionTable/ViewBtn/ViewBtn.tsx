import s from "./ViewBtn.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const ViewBtn = () => {
  return (
    <div className={s.view}>
      <VisibilityIcon className={s.icon} />
      View
    </div>
  );
};
