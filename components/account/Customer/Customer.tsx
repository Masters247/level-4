import Pencil from "../../ui/icons/Pencil";
import s from "./customer.module.scss";

const Customer = ({ type, data }: any) => {
  return (
    <div className={s.customer}>
      <div className={s.details}>
        <h3>{type}</h3>
      </div>
      <div className={s.details}>
        <p>{data}</p>
      </div>
      <div className={s.details}>
        <Pencil styles={s.pencil} />
      </div>
    </div>
  );
};

export default Customer;
