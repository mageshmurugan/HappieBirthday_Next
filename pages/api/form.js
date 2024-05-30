import User from "@/model/users";
import Dates from "@/model/dates";
import jwt from "jsonwebtoken";

export default async function form(req, res) {
  let token;
  const { mobile } = req.body;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      // console.log(req.headers)
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // Get user from the token
      req.user = await User.findOne({
        phone: decoded.mobile,
      });
      if (decoded.mobile == mobile) {
        try {
          const { names, email, date, nam } = req.body;
          const m = date.split("-");
          const sp = m[0];
          const n = m.slice(1);
          const tit = n.join("-");
          // const ips = req.headers['x-forwarded-for'];
          const ips = req.socket.remoteAddress;
          const data = new Dates({
            email: email,
            names: names,
            date: tit,
            year: sp,
            nam: nam,
            ip: ips,
          });
          await data.save();
          console.log(data);
          return res
            .status(200)
            .json({ message: "Automated Email Successfully" });
        } catch {
          res.status(400).json({ message: "Email automation failed" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}
