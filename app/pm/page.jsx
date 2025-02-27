import connectToDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import MessagesList from "@/components/MessagesList";

const PmPage = async () => {
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
   

  // Simplify the serialization - only keep the data you need
  const sm = messages.map((message) => ({
    _id: message._id.toString(),
    text: message.text || "",
    propertyName: message.property ? message.property.name : "",
    senderName: message.sender ? message.sender.username : "",
    senderEmail: message.sender ? message.sender.email : "",
    recipientName: message.recipient ? message.recipient.username : "",
    createdAt: message.createdAt ? message.createdAt.toISOString() : "",
    read: message.read
    // Add any other specific fields you need
  }));

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

export default PmPage;
