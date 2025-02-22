import Button from "@components/react/Button";

type FeaturedCarrierProps = {
  onClickContinue: () => void;
};

const FeaturedCarrier = ({ onClickContinue }: FeaturedCarrierProps) => {
  return (
    <div className="margin-header layout">
      <div className="flex flex-col w-full min-h-[40vh] lg:flex-row lg:justify-between pt-[4.43rem] lg:pt-[8rem]">
        <div className="mb-14 lg:w-[50%] lg:mb-0 lg:mr-8 !leading-[1.2] flex flex-col">
          <h1 className="font-extrabold text-4xl lg:text-[3.5rem] leading-[1.2] text-primary-500">
            Your featured carrier
          </h1>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-center ">
            <img
              className="w-[17.25rem] lg:w-[31rem] h-auto mb-12 lg:mb-9"
              src="https://d29u10q7qlh006.cloudfront.net/i/i/47/Hw0rpgvXKj7RnbyrQocqXd3NLMw.png"
              alt="Progresssive"
            />
            <div className="font-bold mb-7 text-center text-xl text-primary-500">
              Great news! We&apos;ve matched you with Progressive
            </div>
            <div className="text-primary-500 text-center text-lg mb-12 lg:mb-9">
              Continue to get your personalized rate and buy your policy in
              minutes.
            </div>
            <Button className="w-full mb-6" onClick={onClickContinue}>
              Continue
            </Button>
            <span className="text-foreground-600 text-center lg:text-xl">
              On Progressive&apos;s website
            </span>
          </div>
          <div className="mt-8 lg:mt-8 text-foreground-700 flex items-start lg:justify-center lg:text-xl">
            <div> Want some other carrier options?</div>
            <button
              className="text-secondary-500  lg:ml-2 ml-2"
              onClick={onClickContinue}
            >
              See more offers.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarrier;
