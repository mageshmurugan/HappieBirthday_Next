const keys = {
  type: "service_account",
  project_id: "getmeat-2023",
  private_key_id: process.env.ONE,
  private_key: process.env.TWO,
  client_email: process.env.THREE,
  client_id: process.env.FOUR,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIVE,
  universe_domain: "googleapis.com",
};
export default keys;
