const { auth } = require("firebase-admin");
const admin = require("firebase-admin");

module.exports = {
  sendOTP: async (req, res) => {
    const { phoneNumber } = req.body;

    try {
      // Send the user their OTP code
      //   console.log("auth", auth());

      const sessionInfoData = await auth().createSessionInfo(phoneNumber);

      console.log("sessionInfoData", sessionInfoData);

      // You can use the sessionInfoData to send the OTP code to the user
      res.status(200).json({ status: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  },

  verifyOTP: async (req, res) => {
    {
      const { phoneNumber, code } = req.body;

      try {
        // Verify the OTP code
        const sessionCookie = await auth().createSessionCookie(phoneNumber, {
          expiresIn: "86400", // 24 hours in seconds
        });

        // You can use this sessionCookie to authenticate the user
        res.status(200).json({ sessionCookie });
      } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(401).json({ error: "Invalid OTP" });
      }
    }
  },
};
