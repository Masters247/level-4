import Customer from "../../components/account/Customer/Customer";
import cn from "classnames";
import useDelayedRender from "use-delayed-render";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import s from "../../styles/pages/account.module.scss";
import { a } from "@react-spring/web";

const customer = [
  { type: "name", data: "dan" },
  { type: "email", data: "danecouzens@gmail.com" },
  { type: "password", data: "kdkljsfo" },
  { type: "organisation", data: "the band academy" },
  { type: "country", data: "United Kingdom" },
  { type: "marketing", data: "On" },
];

const Account = () => {
  const [isDetailsShown, setIsDetailsShown] = useState(true);

  const { mounted: isDetailsMounted, rendered: isDetailsRendered } =
    useDelayedRender(isDetailsShown, {
      enterDelay: 300,
      exitDelay: 300,
    });

  const toggleAccountView = () => {
    if (isDetailsMounted) {
      setIsDetailsShown(false);
    } else {
      setIsDetailsShown(true);
    }
  };

  return (
    <div className={s.accountDetailsWrap}>
      <h1>Your Account</h1>
      <div className={s.tabWrap}>
        <button
          onClick={toggleAccountView}
          className={`${s.button} ${isDetailsShown && s.activeDetails}`}
        >
          Details
        </button>
        <button
          onClick={toggleAccountView}
          className={`${s.button} ${!isDetailsShown && s.activeDesigns}`}
        >
          My Designs
        </button>
      </div>
      {isDetailsMounted && (
        <div
          className={
            isDetailsRendered ? s.accountDetailsShow : s.accountDetailsHide
          }
        >
          {customer.map((person: any, i: number) => (
            <Customer
              key={i + person.type}
              type={person.type}
              data={person.data}
            />
          ))}
        </div>
      )}

      {!isDetailsMounted && (
        <div
          className={
            !isDetailsRendered ? s.accountDetailsShow : s.accountDetailsHide
          }
        >
          Designs
        </div>
      )}

      <Button variant="primary" className={s.save} Component="button">
        Save changes
      </Button>
    </div>
  );
};

export default Account;
