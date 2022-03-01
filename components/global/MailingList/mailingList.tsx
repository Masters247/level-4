import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Mail from "../../ui/icons/Mail";
import s from "./mailingList.module.scss";

const MailingList = () => {
  const [thanks, setThanks] = useState(true);
  const JoinUsSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <section className={s.mailWrap}>
      {thanks ? (
        <h2>Join Us</h2>
      ) : (
        <div className={s.thanks}>
          <h2>Thanks</h2>
          <p>for subscribing</p>
        </div>
      )}
      <div className={s.formWrap}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={JoinUsSchema}
          onSubmit={async (data) => {
            const email = data.email;
            const mailingList = await fetch("/api/mailchimp/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(email),
            });
            const res = await mailingList.json();
            setThanks(false);
          }}
        >
          {({ errors, touched }) => (
            <>
              {thanks ? (
                <Form className={s.form}>
                  <Field
                    placeholder="Enter Email"
                    className={s.input}
                    name="email"
                  />
                  {errors.email && touched.email ? (
                    <div className={s.error}>{errors.email}</div>
                  ) : null}
                  <button className={s.formButton} type="submit">
                    <p>Subscribe</p>
                    <Mail styles={s.mailIcon} />
                  </button>
                </Form>
              ) : null}
            </>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default MailingList;
