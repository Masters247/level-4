import { FC } from "react";
import Pencil from "../../ui/icons/Pencil";
import s from "./customer.module.scss";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { Account } from "@prisma/client";

export type Customer = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  organisation: string;
  emailSignup: boolean;
  accounts: Account[];
};

interface Props {
  customer: Customer;
  mutate: any;
}

const Customer: FC<Props> = ({ customer, mutate }) => {
  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [organisation, setOrganisation] = useState(customer?.organisation);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/account/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          org: organisation,
          id: customer.id,
        }),
      });
      setLoading(false);
      mutate();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.customer}>
        <div className={s.details}>
          <h3>Name</h3>
        </div>
        <div className={s.details}>
          <input
            placeholder={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className={s.customer}>
        <div className={s.details}>
          <h3>Email</h3>
        </div>
        <div className={s.details}>
          <input
            required
            defaultValue={email}
            placeholder={email}
            disabled={!customer.emailSignup}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!customer.emailSignup && (
          <div className={s.details}>
            <p className={s.provider}>
              *Email provided by <span>{customer.accounts[0]?.provider}</span>
            </p>
          </div>
        )}
      </div>

      <div className={s.customer}>
        <div className={s.details}>
          <h3>Organisation</h3>
        </div>
        <div className={s.details}>
          <input
            placeholder={organisation}
            type="text"
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </div>
      </div>

      {customer.emailSignup && (
        <div className={s.customer}>
          <div className={s.details}>
            <h3>Password</h3>
          </div>
          <div className={s.resetPassword}>Reset Password</div>
        </div>
      )}

      <Button
        loading={loading}
        variant="primary"
        className={s.save}
        Component="button"
        disabled={
          name === customer?.name &&
          email === customer?.email &&
          organisation === customer?.organisation
        }
        type="submit"
      >
        Save changes
      </Button>
    </form>
  );
};

export default Customer;
