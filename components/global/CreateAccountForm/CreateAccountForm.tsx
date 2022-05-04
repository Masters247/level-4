import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./createAccountForm.module.scss";

const ContactForm = () => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    business: Yup.string().min(6, "Too Short!").max(500, "Too Long!"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const [thankYou, setThankYou] = useState(false);

  return (
    <>
      {thankYou ? (
        <main className={s.thankYou}>
          <h2>Your account is ready</h2>
          {/* <Link href="/search">
            <a className={s.link}>Continue Shopping</a>
          </Link> */}
        </main>
      ) : (
        <main className={s.formWrap}>
          <Formik
            initialValues={{
              checked: [],
              name: "",
              business: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (data) => {
              const formData = data;

              fetch("/api/account/createAccount", {
                method: "post",
                body: JSON.stringify(formData),
              });

              setThankYou(true);
            }}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                <div className={s.name}>
                  <Field name="name" placeholder="*Name" />
                  {errors.name && touched.name ? (
                    <div className={s.error}>{errors.name}</div>
                  ) : null}
                </div>

                <div className={s.organisation}>
                  <Field
                    name="business"
                    type="business"
                    placeholder="*Golf Club / Organisation / Business"
                  />
                  {errors.business && touched.business ? (
                    <div className={s.error}>{errors.business}</div>
                  ) : null}
                </div>

                <div className={s.email}>
                  <Field name="email" type="email" placeholder="*Email" />
                  {errors.email && touched.email ? (
                    <div className={s.error}>{errors.email}</div>
                  ) : null}
                </div>

                <div className={s.password}>
                  <Field
                    name="password"
                    type="password"
                    placeholder="*password"
                  />
                  {errors.password && touched.password ? (
                    <div className={s.error}>{errors.password}</div>
                  ) : null}
                </div>

                <div className={s.passwordInfo}>
                  <p>
                    8 - 20 characters, containing at least the following 3 types
                    of characters: Lower case letters &#40;a-z&#41;, Upper case
                    letters &#40;A-Z&#41;, Numbers &#40;i.e. 0-9&#41;.
                  </p>
                </div>

                <div className={s.marketing}>
                  <Field
                    type="checkbox"
                    name="checkbox"
                    value="Marketing Ticked"
                  />

                  <p>
                    I am happy to opt-in to marketing communications from Level
                    4
                  </p>
                </div>
                <button type="submit">Create Account</button>
              </Form>
            )}
          </Formik>
        </main>
      )}
    </>
  );
};

export default ContactForm;
