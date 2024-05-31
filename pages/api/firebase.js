import serviceAccount from "../../serviceAccounts.js";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import User from "@/model/users";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default function firebase(req, res) {
  const { phoneNumber } = req.body.user;
  const { accessToken } = req.body.user.stsTokenManager;

  admin
    .auth()
    .verifyIdToken(accessToken)
    .then(async (decodedToken) => {
      console.log(decodedToken);
      if (decodedToken.phone_number == phoneNumber) {
        const existNo = await User.findOne({
          phone: decodedToken.phone_number,
        });
        console.log(`exist......${existNo}`);
        if (existNo) {
          const jwtAccess = jwt.sign(
            { mobile: existNo.phone },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20d" }
          );
          const mobile = existNo.phone;
          res.status(200).json({ jwtAccess, mobile });
        } else {
          const users = new User({
            phone: decodedToken.phone_number,
          });
          await users.save();

          const jwtAccess = jwt.sign(
            { mobile: users.phone },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20d" }
          );
          const mobile = users.phone;

          res.status(200).json({ jwtAccess, mobile });
        }
      }
    })
    .catch((error) => {
      console.error("Error verifying access token:", error);
      res.status(400).json({ message: "Token verification failed" });
    });
}
