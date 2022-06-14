import { FC } from "react";
import s from "./customer.module.scss";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { Account } from "@prisma/client";
import { signOut } from "next-auth/react";

export type Customer = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  organisation: string;
  emailSignup?: boolean;
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
  const [resetNotify, setResetNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

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

  const passwordReset = async () => {
    setPasswordLoading(true);
    setResetNotify(false);
    try {
      const resetStart = await fetch(
        `/api/account/reset-password-email?email=${customer.email}`
      );
      const res = await resetStart.json();

      if (res.status === "success") {
        setPasswordLoading(false);
        setResetNotify(true);
      } else {
        setPasswordLoading(false);
        setResetNotify(false);
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log("Reset Error:", error.message);
    }
  };

  const deleteAccount = async () => {
    setDeleteWarning(false);
    try {
      const deleteUser = await fetch("/api/account/deleteAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: customer.id,
        }),
      });
      const res = await deleteUser.json();
      if (res.status === "success") {
        signOut();
      }
    } catch (error) {
      console.log(error);
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
            disabled={!customer?.emailSignup}
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
          <Button
            className={s.resetPassword}
            onClick={passwordReset}
            variant="secondary"
            loading={passwordLoading}
          >
            Reset Password
          </Button>
          {resetNotify && (
            <p className={s.passwordSuccess}>
              We&apos;ve sent you a link to reset your password. This is only
              valid for 10 minutes.
            </p>
          )}
        </div>
      )}

      <div className={s.buttons}>
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
        <Button
          variant="primary"
          className={s.deleteAccount}
          Component="button"
          onClick={() => setDeleteWarning(true)}
          type="button"
        >
          Delete account
        </Button>
      </div>

      {deleteWarning && (
        <div className={s.deleteWarning}>
          <p>
            Deleting your account is irreversible and will delete any custom
            designs saved to your account. All data will be instantly removed
            from our database.
          </p>
          <div className={s.buttons}>
            <Button
              variant="secondary"
              Component="button"
              onClick={deleteAccount}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              Component="button"
              className={s.cancel}
              onClick={() => setDeleteWarning(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Customer;
