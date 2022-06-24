const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email: string) => {
  const data = {
    to: `${email}`,
    from: "info@level-four.co.uk",
    template_id: "d-be684c8a664e42e98b18ff5c3610d7a8",
  };
  return await mail.send(data);
};

export default sendWelcomeEmail;
