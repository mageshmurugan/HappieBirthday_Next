export default async function cron(req, res) {
  const loggedInResponse = await fetch("https://happiebirthday.onrender.com/", {
    method: "POST",
  });
  res.status(200).json({ message: "Cron job ran successfully" });
}
