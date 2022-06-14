import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./contactForm.module.scss";

const ContactForm = () => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    // lastName: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required"),
    message: Yup.string()
      .min(6, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
    business: Yup.string()
      .min(6, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const [thankYou, setThankYou] = useState(false);

  return (
    <>
      {thankYou ? (
        <main className={s.thankYou}>
          <h2>Thank You</h2>
          <p>We will be in touch soon...</p>
          <Link href="/search">
            <a className={s.link}>Continue Shopping</a>
          </Link>
        </main>
      ) : (
        <main className={s.formWrap}>
          <Formik
            initialValues={{
              checked: [],
              name: "",
              // lastName: "",
              business: "",
              email: "",
              message: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (data) => {
              const formData = data;

              fetch("/api/mail", {
                method: "post",
                body: JSON.stringify(formData),
              });

              setThankYou(true);
            }}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                <div className={s.formTop}>
                  <div className={s.wrap}>
                    {/* <label htmlFor="name">
                      <span>&#42;</span> Name
                    </label> */}
                    <Field className={s.name} name="name" placeholder="*Name" />
                    {errors.name && touched.name ? (
                      <div className={s.error}>{errors.name}</div>
                    ) : null}
                  </div>
                  {/* <div className={s.wrap}>
                    <label htmlFor="lastName">
                      <span>&#42;</span> Last Name
                    </label>
                    <Field name="lastName" />
                    {errors.lastName && touched.lastName ? (
                      <div className={s.error}>{errors.lastName}</div>
                    ) : null}
                  </div> */}
                </div>
                <div className={s.formMiddle}>
                  <div className={s.email}>
                    {/* <label htmlFor="business">
                      <span>&#42;</span> Golf Club / Organisation / Business
                    </label> */}
                    <Field
                      name="business"
                      type="business"
                      placeholder="*Golf Club / Organisation / Business"
                    />
                    {errors.business && touched.business ? (
                      <div className={s.error}>{errors.business}</div>
                    ) : null}
                  </div>
                </div>
                <div className={s.formMiddle}>
                  <div className={s.email}>
                    {/* <label htmlFor="email">
                      <span>&#42;</span> Email
                    </label> */}
                    <Field name="email" type="email" placeholder="*Email" />
                    {errors.email && touched.email ? (
                      <div className={s.error}>{errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className={s.formBottom}>
                  <div className={s.email}>
                    <Field
                      name="message"
                      as="textarea"
                      placeholder="*Message"
                    />
                    {errors.message && touched.message ? (
                      <div className={s.error}>{errors.message}</div>
                    ) : null}
                  </div>

                  <label>
                    <Field
                      type="checkbox"
                      name="checkbox"
                      value="Marketing Ticked"
                    />

                    <p>
                      I am happy to opt-in to marketing communications from
                      Level 4
                    </p>
                  </label>

                  <button type="submit">Send</button>
                </div>
              </Form>
            )}
          </Formik>
        </main>
      )}
    </>
  );
};

export default ContactForm;
