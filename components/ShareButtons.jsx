"use client";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          shareUrl={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}forRent`}
        >
          <FacebookIcon width={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          shareUrl={shareUrl}
          title={property.name}
          hashtags={[`#${property.type.replace(/\s/g, "")}forRent`]}
        >
          <TwitterIcon width={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton  shareUrl={shareUrl}
          title={property.name}
          separator="::"
          >
          <WhatsappIcon width={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton  url={shareUrl}
          subject={property.name}
          body={`Check out this property ${shareUrl}`}
          >
          <EmailIcon width={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
