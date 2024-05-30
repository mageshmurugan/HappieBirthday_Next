import serviceAccount from "../../serviceAccountKey.json";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import User from "@/model/users";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default function firebase(req, res) {
  const { phoneNumber } = req.body.user;
  const { accessToken } = req.body.user.stsTokenManager;
  // const phoneNumber='+919345480054'
  // const accessToken='eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3YmFiYWFiYTEwNWFkZDZiM2ZiYjlmZjNmZjVmZTNkY2E0Y2VkYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2V0bWVhdC0yMDIzIiwiYXVkIjoiZ2V0bWVhdC0yMDIzIiwiYXV0aF90aW1lIjoxNjg3MDc3NTYzLCJ1c2VyX2lkIjoidmVuUXU2R0QxSFV5dmsyQVVtdENwbEFZRHE1MyIsInN1YiI6InZlblF1NkdEMUhVeXZrMkFVbXRDcGxBWURxNTMiLCJpYXQiOjE2ODcwNzc1NjMsImV4cCI6MTY4NzA4MTE2MywicGhvbmVfbnVtYmVyIjoiKzkxOTM0NTQ4MDA1NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTM0NTQ4MDA1NCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.ev_uRdC1CtdHXPWyV5wCUKzLB0RXl3FUQV9VLAvqvqzYLs0beqLsfPVlX-xMIxG0e8fIAOMJ0nT3hJwRcVTFQIIz9Au8mB9unxe11wCCr4kg_bnzWcGfxAxZ56-VWj6xYI1roaQsTEOc_k80whxBZMDdibwIDgLAFaKi2XYXHC8VoDoh17Gxx4iyeaaqTnRyC1MJH4Pn_tJyBiIIwOFhozsvou4DprzSLn84oy8z0-fpTSI9Nq6r3S4cYxreMvbUa9eVmVWrrsT0OGtozBWbR01C2Y3OoB9-2hZJu6xwSRl_-Usw1HE_92QSmlOYbIppthH3ad9Op2fIeW_qNw3v2g';

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
