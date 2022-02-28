import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Mail from "../../ui/icons/Mail";
import s from "./mailingList.module.scss";

const MailList = () => {
  const JoinUsSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <section className={s.mailWrap}>
      <h2>Join Us</h2>
      <div className={s.formWrap}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={JoinUsSchema}
          onSubmit={async (data) => {
            const formData = data;
            console.log(formData);
          }}
        >
          {({ errors, touched }) => (
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
          )}
        </Formik>
      </div>
    </section>
  );
};

export default MailList;
