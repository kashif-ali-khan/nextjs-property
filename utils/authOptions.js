import GoogleProvider from "next-auth/providers/google";
import connectToDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1.Connect to DB
      await connectToDB();
      // 2.check if USER alreday exist

      const user = await User.findOne({ email: profile.email });
      // 3.if not create USER
      if (!user) {
        User.create({
          email: profile.email,
          username: profile.name,
          picture: profile.picture,
        });
      }
      // 4.return true to allow sign in

      return true;
    },
    // session callback function tah modifies the sesison object
    async session({ session }) {
      // 1.Get user form database
      const user = await User.findOne({ email: session.user.email }).lean();
      // 2.Assign userid from database
      session.user.id = user._id.toString();

      session.kashif = user;
      // 3. Return session
      console.log(session,'FROM s', user)
      return session;
    },
  },
};
