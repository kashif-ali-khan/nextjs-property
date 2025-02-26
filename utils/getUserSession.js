import connectToDB from "@/config/database";
import { getServerSession } from "next-auth/next";
//import User from "@/models/User";
//import authOptions from "@/utils/authOptions";

export const getSessionUser = async () => {
 
    const session = await getServerSession();

    console.log(session,'TESTETETET')
    if (!session || !session.user) {
      return null;
    }
    return {
      user: session.user,
      userId: session.user.id,
    };

};
