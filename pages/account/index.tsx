import Customer from "../../components/account/Customer/Customer";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import s from "../../styles/pages/account.module.scss";

const customer = [
  { type: "name", data: "dan" },
  { type: "email", data: "danecouzens@gmail.com" },
  { type: "password", data: "kdkljsfo" },
  { type: "organisation", data: "the band academy" },
  { type: "country", data: "United Kingdom" },
  { type: "marketing", data: "On" },
];

const Account = () => {
  const [state, setState] = useState(true);
  return (
    <div className={s.accountDetailsWrap}>
      <h1>Your Account</h1>
      <div className={s.tabWrap}>
        <button className={`${s.button} ${state && s.active}`}>Details</button>
        <button className={`${s.button} ${!state && s.active}`}>
          My Designs
        </button>
      </div>
      <div className={s.accountDetails}>
        {customer.map((person: any) => (
          <Customer type={person.type} data={person.data} />
        ))}
      </div>
      <Button variant="primary" className={s.save} Component="button">
        Save changes
      </Button>
    </div>
  );
};

export default Account;
