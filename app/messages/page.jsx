import connectToDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import MessagesList from "@/components/MessagesList";

const MessagesPage = async () => {
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email });
  const messages = await Message.find({ recipient: user._id.toString() })
    .sort({
      createdAt: -1,
    })
    .populate("property", "name")
    .populate("sender", "username email")
    .populate("recipient", "username email")
   

  const sm = messages.map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.property = convertToSerializeableObject(messageDoc.property);
    message.recipient = convertToSerializeableObject(messageDoc.recipient);
    message.sender = convertToSerializeableObject(messageDoc.sender);
    return message;
  });

  //console.log(serializedMessages, "Hello");

  return (
  <>
  <section className="bg-blue-50">
    <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md  border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your messages</h1>
            <div className="space-y-4">
                {sm.length === 0 ? (<p>You have no messages</p>) : (
                   <MessagesList messages={sm} />
                )}

            </div>
        </div>
    </div>
  </section>
  
  </>);
};

export default MessagesPage;
