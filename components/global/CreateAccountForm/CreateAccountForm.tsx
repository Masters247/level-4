import React, { useState, FC } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./createAccountForm.module.scss";

// interface Props {
//   providers: any;
//   csrfToken: any;
// }

const ContactForm: FC = () => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    organisation: Yup.string().min(6, "Too Short!").max(500, "Too Long!"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  // console.log("providers", providers, "csrfToken", csrfToken);

  const [thankYou, setThankYou] = useState(false);

  return (
    <>
      {thankYou ? (
        <main className={s.thankYou}>
          <h2>Your account is ready</h2>
        </main>
      ) : (
        <main className={s.formWrap}>
          <Formik
            initialValues={{
              checked: [],
              name: "",
              organisation: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (data: any) => {
              const formData = data;

              fetch("/api/account/createAccount", {
                method: "post",
                body: JSON.stringify(formData),
              });

              console.log("submitted");

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
                    name="organisation"
                    type="organisation"
                    placeholder="*Golf Club / Organisation / Business"
                  />
                  {errors.organisation && touched.organisation ? (
                    <div className={s.error}>{errors.organisation}</div>
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
                    placeholder="*Password"
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
