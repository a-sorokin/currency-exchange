import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import s from "./DeleteBtn.module.scss";

export const DeleteBtn = () => {
  return (
    <div className={s.delete}>
      <DeleteForeverIcon className={s.icon} />
      Delete from history
    </div>
  );
};
