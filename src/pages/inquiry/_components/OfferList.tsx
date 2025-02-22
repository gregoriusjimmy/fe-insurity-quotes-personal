import InsuranceItem from "@pages/rates/_components/InsuranceItem";
import dummyInsurances from "@pages/rates/_components/insurances.json";

const OfferList = () => {
  return (
    <div className="margin-header">
      <div className="flex flex-col layout mt-9 lg:mt-11 ">
        <div className="font-black text-2xl lg:text-6xl mb-4">
          Get offers from featured carriers
        </div>
        <div className="mb-10">
          We&apos;re able to personalize your rate more with the location of
          your vehicle. You&apos;ll be able to compare offers from top carriers
          that are available in your area.
        </div>
        <div className="flex flex-col space-y-2 lg:space-y-0 gap-y-10 lg:grid lg:grid-cols-3 w-full">
          {dummyInsurances.data.map((insurance, idx) => (
            <InsuranceItem insurance={insurance} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferList;
