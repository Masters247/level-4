import { FC } from "react";
import Pencil from "../../ui/icons/Pencil";
import s from "./customer.module.scss";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { UserProfile } from "@auth0/nextjs-auth0";

interface Props {
  customer?: UserProfile;
}

const Customer: FC<Props> = ({ customer }) => {
  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [organisation, setOrganisation] = useState("");
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editOrganisation, setEditOrganisation] = useState(false);
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
          org: organisation,
          id: customer?.sub,
        }),
      });
      setLoading(false);
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
            ref={(input) => input && input.focus()}
            disabled={!editName}
            placeholder={name!}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div
          className={s.details}
          onClick={() => {
            setEditName(!editName);
          }}
        >
          <Pencil styles={s.pencil} />
        </div>
      </div>

      <div className={s.customer}>
        <div className={s.details}>
          <h3>Email</h3>
        </div>
        <div className={s.details}>
          <input
            ref={(input) => input && input.focus()}
            required
            disabled={!editEmail}
            placeholder={email!}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={s.details}
          onClick={() => {
            setEditEmail(!editEmail);
          }}
        >
          <Pencil styles={s.pencil} />
        </div>
      </div>

      <div className={s.customer}>
        <div className={s.details}>
          <h3>Organisation</h3>
        </div>
        <div className={s.details}>
          <input
            disabled={!editOrganisation}
            ref={(input) => input && input.focus()}
            placeholder={organisation!}
            type="text"
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </div>
        <div
          className={s.details}
          onClick={() => {
            setEditOrganisation(!editOrganisation);
          }}
        >
          <Pencil styles={s.pencil} />
        </div>
      </div>

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
