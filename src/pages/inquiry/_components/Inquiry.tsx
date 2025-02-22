import Button from "@components/react/Button";

import { useCallback, useEffect, useMemo, useState } from "react";
import FormLayout from "./FormLayout";
import ZipCodeQuestion from "./ZipCodeQuestion";
import YesNoHaveQuestion from "./YesHaveNoQuestion";
import MultipleSelectOneQuestion from "./MultipleSectOneQuestion";
import {
  INSURER_OPTIONS,
  INSURER_OPTIONS2,
  INSURANCE_DURATION_OPTIONS,
  YEAR_OPTIONS,
  YEAR_OPTIONS_2,
  CAR_BRANDS_OPTIONS,
  CAR_BRANDS_OPTIONS2,
  CAR_MODELS,
  CAR_TRIMS,
  AVERAGE_MILEAGE,
  GENDER_OPTIONS,
  HOME_OWNERSHIP_OPTIONS,
  EDUCATION_OPTIONS,
  EDUCATION_OPTIONS_2,
  OCCUPATION_OPTIONS,
  OCCUPATION_OPTIONS_2,
  SCORE_OPTIONS,
  CAR_END_AT_STEP,
  CAR_START_AT_STEP,
  DRIVER_END_AT_STEP,
  DRIVER_FACTORY,
  DRIVER_START_AT_STEP,
  USER_CAR_FACTORY,
  ZIP_CODE_STEP,
  ANSWER_DATA_FACTORY,
  FULL_NAME_STEP,
  BIRTHDAY_STEP,
  CAR_ADDRESS_STEP,
  DRIVER_CAR_FACTORY,
  START_START_AT_STEP,
  STEPS_INFO,
} from "../_constants";
import { capitalizeString, scrollToTop } from "src/helpers";
import TicketQuestion, { type TTicketForm } from "./TicketQuestion";
import FullNameAnswer from "./FullNameAnswer";
import BirthdayQuestion from "./BirthdayQuestion";
import CarAddressQuestion from "./CarAddressQuestion";
import PreviousCarAddressQuestion from "./PreviousCarAddressQuestion";
import type { TAnswerData, TUserCar, TDriver } from "../_constants/types";
import OfferList from "./OfferList";
import FeaturedCarrier from "./FeaturedCarrier";
import BackButton from "./BackButton";
import Stepper from "@components/react/Stepper";

const Inquiry = () => {
  const [answerData, setAnswerData] =
    useState<TAnswerData>(ANSWER_DATA_FACTORY);
  const [currentStep, setCurrentStep] = useState<string | number>(1);
  const [currentStepStepper, setCurrentStepStepper] = useState(1);
  const [stepperProgression, setStepperProgression] = useState(0);
  const [answeredStep, setAnsweredStep] = useState<Array<string | number>>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isSeeOfferList, setIsSeeOfferList] = useState(false);

  const onSetAnswerData = useCallback(
    <K extends keyof TAnswerData>(key: K, value: TAnswerData[K]) => {
      setAnswerData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const currentCarIndex = useMemo(() => {
    const length = answeredStep.filter(
      (step) => step === CAR_END_AT_STEP,
    ).length;
    if (!length) return 0;
    return length;
  }, [answeredStep]);

  const currentCarInput = useMemo(
    () => answerData.userCars[currentCarIndex],
    [answerData.userCars, currentCarIndex],
  );

  const currentCarFullName = useMemo(
    () => `${currentCarInput?.makeBrand} ${currentCarInput?.model}`,
    [currentCarInput],
  );

  const storeCar = useCallback(
    (car: TUserCar) => {
      const updatedUserCars = [
        ...answerData.userCars.slice(0, currentCarIndex + 1), // Keep items up to currentCarIndex
      ];
      updatedUserCars[currentCarIndex] = car;

      setAnswerData((prevData) => ({
        ...prevData,
        userCars: updatedUserCars,
      }));
    },
    [answerData.userCars, currentCarIndex],
  );

  const onSetCurrentCarInput = useCallback(
    <K extends keyof TUserCar>(key: K, value: TUserCar[K]) => {
      const temp = { ...USER_CAR_FACTORY, ...currentCarInput, [key]: value };
      storeCar(temp);
    },
    [currentCarInput, storeCar],
  );

  const currentDriverIndex = useMemo(() => {
    const length = answeredStep.filter(
      (step) => step === DRIVER_END_AT_STEP,
    ).length;
    if (!length) return 0;
    return length;
  }, [answeredStep]);

  const currentDriverInput = useMemo(
    () => answerData.drivers[currentDriverIndex] || DRIVER_FACTORY,
    [answerData.drivers, currentDriverIndex],
  );

  const storeDriver = useCallback(
    (driver: TDriver) => {
      const updatedDrivers = [
        ...answerData.drivers.slice(0, currentDriverIndex + 1),
      ];
      updatedDrivers[currentDriverIndex] = driver;

      setAnswerData((prevData) => ({
        ...prevData,
        drivers: updatedDrivers,
      }));
    },
    [answerData.drivers, currentDriverIndex],
  );

  const onSetCurrentDriverInput = useCallback(
    <K extends keyof TDriver>(key: K, value: TDriver[K]) => {
      setAnswerData((prevData) => {
        const updatedDrivers = [...prevData.drivers];
        const tempDriver = {
          ...DRIVER_FACTORY,
          ...prevData.drivers[currentDriverIndex],
          [key]: value,
        };
        updatedDrivers[currentDriverIndex] = tempDriver;

        return {
          ...prevData,
          drivers: updatedDrivers,
        };
      });
    },
    [currentDriverIndex],
  );

  const onSetCurrentStep = useCallback(
    (step: number | string) => {
      setAnsweredStep((prev) => [...prev, currentStep]);
      setCurrentStep(step);
      if (currentStep === CAR_END_AT_STEP) {
        storeCar(currentCarInput);
      }

      if (currentStep === DRIVER_END_AT_STEP) {
        storeDriver(currentDriverInput);
      }
    },
    [currentCarInput, currentDriverInput, currentStep, storeCar, storeDriver],
  );

  const onNextStep = useCallback(() => {
    if (typeof currentStep === "string") return;

    scrollToTop();
    onSetCurrentStep(currentStep + 1);
  }, [currentStep, onSetCurrentStep]);

  const handleGoBack = useCallback(() => {
    scrollToTop();
    setAnsweredStep((prev) => {
      if (prev.length === 0) return prev; // No steps to go back to
      const updatedSteps = [...prev];

      const lastStep = updatedSteps.pop(); // Safely remove the last step

      if (lastStep !== undefined) {
        setCurrentStep(lastStep); // Update the current step
      }

      if (
        !updatedSteps.includes(ZIP_CODE_STEP) &&
        currentStep === ZIP_CODE_STEP
      ) {
        onSetAnswerData("zipCode", "");
      }

      if (
        updatedSteps.filter((step) => step === FULL_NAME_STEP).length ===
          currentDriverIndex &&
        currentStep === FULL_NAME_STEP
      ) {
        onSetCurrentDriverInput("firstName", "");
        onSetCurrentDriverInput("lastName", "");
      }

      if (
        updatedSteps.filter((step) => step === BIRTHDAY_STEP).length ===
          currentDriverIndex &&
        currentStep === BIRTHDAY_STEP
      ) {
        onSetCurrentDriverInput("birthday", "");
      }

      if (
        updatedSteps.filter((step) => step === CAR_ADDRESS_STEP).length ===
          currentDriverIndex &&
        currentStep === CAR_ADDRESS_STEP
      ) {
        onSetCurrentDriverInput("address", DRIVER_CAR_FACTORY);
      }

      return updatedSteps;
    });
  }, [
    currentDriverIndex,
    currentStep,
    onSetAnswerData,
    onSetCurrentDriverInput,
  ]);

  useEffect(() => {
    let currentStepTemp = 1;
    let currentProgression = 0;
    for (const val of Object.values(STEPS_INFO)) {
      if (
        answeredStep.includes(val.START_STEP) ||
        currentStep === val.START_STEP
      ) {
        currentStepTemp = val.STEP_ORDER;
        const match = currentStep.toString().match(/^\d+/);
        const firstNumber = match ? parseInt(match[0], 10) : null;
        if (firstNumber !== null) {
          const dividend = firstNumber - val.START_STEP;
          currentProgression = (dividend / val.TOTAL_STEP) * 100;
        }
      }
    }
    setCurrentStepStepper(currentStepTemp);
    setStepperProgression(currentProgression);
  }, [answeredStep, currentStep]);

  const isNextDriver = useMemo(
    () => answeredStep.includes(DRIVER_END_AT_STEP),
    [answeredStep],
  );

  const map: Record<number | string, React.ReactNode> = useMemo(
    () => ({
      [START_START_AT_STEP]: (
        <YesNoHaveQuestion
          intro="Let's start with the basics"
          question="Do you currently have car insurance?"
          onAnswer={(val) => {
            onSetAnswerData("isHaveCarInsurance", val);
            onSetCurrentStep(val ? "1.A1" : "1.B1");
          }}
        />
      ),
      ["1.A1"]: (
        <MultipleSelectOneQuestion
          options={INSURER_OPTIONS}
          options2={INSURER_OPTIONS2}
          placeholder="Select Insurer"
          intro="Out with the old, in with the new"
          question="Who's your current insurer?"
          onAnswer={(val) => {
            if (val === "None") {
              onSetCurrentStep(2);
              return;
            }
            onSetAnswerData("currentInsurer", val);
            onSetCurrentStep("1.A2");
          }}
        />
      ),
      ["1.A2"]: (
        <MultipleSelectOneQuestion
          options={INSURANCE_DURATION_OPTIONS}
          isSmall
          question={`How long have you been insured with ${answerData.currentInsurer === "Other" ? "current insurer" : answerData.currentInsurer}?`}
          note="Carrier loyalty can score you lower rates and sweet discounts!"
          onAnswer={(val) => {
            onSetAnswerData("durationWithInsurer", val);
            onSetCurrentStep(2);
          }}
        />
      ),
      ["1.B1"]: (
        <YesNoHaveQuestion
          question="Are you currently in the military or have you been deployed overseas?"
          onAnswer={(val) => {
            onSetAnswerData("isInMilitary", val);
            onSetCurrentStep(2);
          }}
        />
      ),
      [ZIP_CODE_STEP]: (
        <ZipCodeQuestion
          defaultValues={{ zipCode: answerData.zipCode }}
          note="We can personalize your rate more with the location of your
                vehicle. You'll be able to compare offers from top carriers that
                are available in your area."
          question={"What's your ZIP code?"}
          onAnswer={(val) => {
            onSetAnswerData("zipCode", val);
            onNextStep();
          }}
        />
      ),
      [CAR_START_AT_STEP]: (
        <MultipleSelectOneQuestion
          options={YEAR_OPTIONS}
          options2={YEAR_OPTIONS_2}
          placeholder="Select other year"
          intro="Let's get started"
          question="What year is your vehicle?"
          note="If you're not sure, your best guess is fine!"
          onAnswer={(val) => {
            onSetCurrentCarInput("vehicleYear", val);
            onNextStep();
          }}
        />
      ),
      4: (
        <MultipleSelectOneQuestion
          options={CAR_BRANDS_OPTIONS.map((opt) => ({
            label: (
              <div className="flex flex-col items-center space-y-4">
                <img
                  className="w-[2.5rem] h-[2rem]  object-contain object-center"
                  src={`/images/vehicles-logos/${opt.label?.toString().toLowerCase()}.png`}
                />
                <span>{opt.label}</span>
              </div>
            ),
            value: opt.value,
          }))}
          options2={CAR_BRANDS_OPTIONS2}
          placeholder="Search your make"
          intro="Let's get some vehicle details"
          question="What make is your vehicle?"
          onAnswer={(val) => {
            onSetCurrentCarInput("makeBrand", val);
            onNextStep();
          }}
        />
      ),
      5: (
        <MultipleSelectOneQuestion
          options={CAR_MODELS}
          intro="A few more details"
          question="What model is your vehicle?"
          onAnswer={(val) => {
            onSetCurrentCarInput("model", val);
            onNextStep();
          }}
        />
      ),
      6: (
        <MultipleSelectOneQuestion
          options={CAR_TRIMS}
          intro="A few more details"
          note="Trim is the version of your vehicle's model. If you're not sure what yours is, your best guess is fine!"
          question="What's the trim of your vehicle?"
          onAnswer={(val) => {
            onSetCurrentCarInput("trim", val);
            onNextStep();
          }}
        />
      ),
      7: (
        <MultipleSelectOneQuestion
          options={[
            { label: "Own", value: "Own" },
            { label: "Finance", value: "Finance" },
            { label: "Lease", value: "Lease" },
          ]}
          isSmall
          intro={`For your ${currentCarFullName}`}
          question="Do you own, lease, or finance this vehicle?"
          onAnswer={(val) => {
            onSetCurrentCarInput("ownerShip", val);
            onNextStep();
          }}
        />
      ),
      8: (
        <MultipleSelectOneQuestion
          options={[
            { label: "Commute", value: "Commute" },
            { label: "Pleasure", value: "Pleasure" },
            { label: "Business", value: "Business" },
            { label: "Other", value: "Other" },
          ]}
          intro={`For your ${currentCarFullName}`}
          isSmall
          question="What's the primary use of your vehicle?"
          onAnswer={(val) => {
            onSetCurrentCarInput("primaryUse", val);
            onNextStep();
          }}
        />
      ),
      9: (
        <MultipleSelectOneQuestion
          options={AVERAGE_MILEAGE}
          intro={`For your ${currentCarFullName}`}
          isSmall
          note="If you're not sure, your best guess is fine! FYI: The average American drives around 14,000 miles per year."
          question="What's your average mileage per year?"
          onAnswer={(val) => {
            onSetCurrentCarInput("avgMileagePerYear", val);
            onNextStep();
          }}
        />
      ),
      [CAR_END_AT_STEP]:
        answerData.userCars.length === 4 ? (
          <FormLayout
            note="Most insurers offer discounts for multi-vehicle policies."
            question="Would you like to add another vehicle?"
            answer={
              <div className="flex flex-col space-y-8">
                <div className="mx-auto text-lg text-center font-bold text-primary-500">
                  You have reached the maximum amount of vehicles!
                </div>
                <Button
                  size="lg"
                  variant="outlined"
                  onClick={() => {
                    onNextStep();
                  }}
                >
                  CONTINUE
                </Button>
              </div>
            }
          />
        ) : (
          <YesNoHaveQuestion
            note="Most insurers offer discounts for multi-vehicle policies."
            question="Would you like to add another vehicle?"
            onAnswer={(isYes) => {
              if (isYes) {
                onSetCurrentStep(CAR_START_AT_STEP);
              } else {
                onNextStep();
              }
            }}
          />
        ),
      11: (
        <FormLayout
          intro="Checkpoint"
          note="The more accurate details you provide, the more precise your quotes will be."
          question="Let's make sure everything looks correct"
          answer={
            <div className="flex flex-col ">
              <div className="flex flex-col space-y-7">
                {answerData.userCars.map((car, idx) => (
                  <div className="flex flex-col" key={idx}>
                    <div className="text-secondary-500 tracking-[0.3rem] text-lg lg:text-xl mb-2 lg:mb-4 font-extrabold">
                      VEHICLE {idx + 1}
                    </div>
                    <div className="font-bold text-primary-500 text-2xl lg:text-4xl mb-4">
                      {car.vehicleYear} {car.makeBrand} {car.model}
                    </div>
                    <div className=" flex flex-col space-y-3 text-xl">
                      <div className="w-full flex justify-between ">
                        <span className="text-foreground-900">Trim</span>
                        <span className="text-foreground-900">{car.trim}</span>
                      </div>
                      <div className="w-full flex justify-between ">
                        <span className="text-foreground-900">Ownership</span>
                        <span className="text-foreground-900">
                          {car.ownerShip}
                        </span>
                      </div>
                      <div className="w-full flex justify-between ">
                        <span className="text-foreground-900">Primary Use</span>
                        <span className="text-foreground-900">
                          {car.primaryUse}
                        </span>
                      </div>
                      <div className="w-full flex justify-between ">
                        <span className="text-foreground-900">Mileage</span>
                        <span className="text-foreground-900">
                          {car.avgMileagePerYear}
                        </span>
                      </div>
                      <div className="w-full flex justify-between ">
                        <span className="text-foreground-900">
                          Full Coverage
                        </span>
                        <span className="text-foreground-900">Yes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => {
                  onNextStep();
                }}
                className="w-[70%] mx-auto lg:mx-0 mt-12"
                size="lg"
              >
                CONTINUE
              </Button>
            </div>
          }
        />
      ),
      [DRIVER_START_AT_STEP]: (
        <FormLayout
          note={
            isNextDriver
              ? undefined
              : "re asking so we can personalize your experience and provide you with an accurate quote."
          }
          question={`What's ${isNextDriver ? "their" : "your"} name?`}
          answer={
            <FullNameAnswer
              defaultValues={{
                firstName: currentDriverInput.firstName,
                lastName: currentDriverInput.lastName,
              }}
              onAnswer={({ firstName, lastName }) => {
                onSetCurrentDriverInput(
                  "firstName",
                  capitalizeString(firstName),
                );
                onSetCurrentDriverInput("lastName", capitalizeString(lastName));
                if (isNextDriver) {
                  onSetCurrentStep(15);
                  return;
                }
                onNextStep();
              }}
            />
          }
        />
      ),
      13: (
        <MultipleSelectOneQuestion
          options={GENDER_OPTIONS}
          isSmall
          intro={
            isNextDriver
              ? undefined
              : `Nice to meet you, ${currentDriverInput?.firstName}`
          }
          note="Most insurance carriers require the gender listed on your driver's license. While not always the case, your gender may impact your rate."
          question={
            isNextDriver
              ? `what's ${currentDriverInput.firstName}'s gender?`
              : `${currentDriverInput.firstName}, what's your gender?`
          }
          onAnswer={(val) => {
            onSetCurrentDriverInput("gender", val);
            onNextStep();
          }}
        />
      ),
      14: (
        <MultipleSelectOneQuestion
          options={HOME_OWNERSHIP_OPTIONS}
          isSmall
          note="Whether you own or rent your home, you may be eligible for discounts and bundling options."
          question={
            isNextDriver
              ? `Do ${currentDriverInput.firstName} own or rent home?`
              : "Do you own or rent your home?"
          }
          onAnswer={(val) => {
            onSetCurrentDriverInput("homeOwnership", val);
            onNextStep();
          }}
        />
      ),
      15: (
        <TicketQuestion
          isNextDriver={isNextDriver}
          onYes={(tickets: TTicketForm) => {
            onSetCurrentDriverInput("hasAccident", true);
            onSetCurrentDriverInput("tickets", tickets);
            onSetCurrentStep("15.A1");
          }}
          driverFirstName={currentDriverInput.firstName}
          onNo={() => {
            onSetCurrentDriverInput("hasAccident", false);
            if (isNextDriver) {
              onSetCurrentStep(21);
              return;
            }
            onNextStep();
          }}
        />
      ),
      ["15.A1"]: (
        <YesNoHaveQuestion
          note="An SR-22 is a certificate that shows you carry at least your state's minimum required amount of car insurance."
          question={
            isNextDriver
              ? `Do ${currentDriverInput.firstName} need an SR-22 form?`
              : `${currentDriverInput.firstName}, do you need an SR-22 form?`
          }
          onAnswer={(val) => {
            onSetCurrentDriverInput("needSR22Form", val);
            if (isNextDriver) {
              onSetCurrentStep(21); //birthday
              return;
            }
            onSetCurrentStep(16);
          }}
        />
      ),
      16: (
        <MultipleSelectOneQuestion
          options={EDUCATION_OPTIONS}
          options2={EDUCATION_OPTIONS_2}
          placeholder="Select other education"
          intro="Let's check for more discounts"
          note="While not always the case, this can qualify you for discounts."
          question={`${currentDriverInput.firstName}, what's your highest level of education?`}
          onAnswer={(val) => {
            onSetCurrentDriverInput("education", val);
            onNextStep();
          }}
        />
      ),
      17: (
        <MultipleSelectOneQuestion
          options={OCCUPATION_OPTIONS}
          options2={OCCUPATION_OPTIONS_2}
          placeholder="Select other occupation"
          intro="Let's check for more discounts"
          note="Why we're asking: Your profession may impact your rate or qualify you for discounts."
          question={`${currentDriverInput.firstName}, what's your current occupation?`}
          onAnswer={(val) => {
            onSetCurrentDriverInput("occupation", val);
            onNextStep();
          }}
        />
      ),
      18: (
        <MultipleSelectOneQuestion
          isSmall
          options={SCORE_OPTIONS}
          note="Your best guess works just fine. Typically, the higher your credit score, the lower your rates."
          question={`${currentDriverInput.firstName}, what's your credit score?`}
          onAnswer={(val) => {
            onSetCurrentDriverInput("creditScore", val);
            onNextStep();
          }}
        />
      ),
      19: (
        <YesNoHaveQuestion
          note="Veterans are eligible for specific insurers as well as potential discounts."
          question={`Have you or a family member honorably served in the U.S. military?`}
          onAnswer={(isYes) => {
            onSetCurrentDriverInput("hasFamilyInMilitary", isYes);
            onNextStep();
          }}
        />
      ),
      20: (
        <YesNoHaveQuestion
          note="Your marital status can affect your rate, and your spouse should be included on your policy."
          question={`${currentDriverInput.firstName}, are you married?`}
          onAnswer={(isYes) => {
            onSetCurrentDriverInput("isMarried", isYes);
            onNextStep();
          }}
        />
      ),
      [BIRTHDAY_STEP]: (
        <BirthdayQuestion
          isNextDriver={isNextDriver}
          driverFirstName={currentDriverInput.firstName}
          defaultValues={{ birthday: currentDriverInput.birthday }}
          onAnswer={(val) => {
            onSetCurrentDriverInput("birthday", val);
            if (isNextDriver) {
              onSetCurrentStep(DRIVER_END_AT_STEP);
              return;
            }
            onNextStep();
          }}
        />
      ),
      [CAR_ADDRESS_STEP]: (
        <CarAddressQuestion
          defaultValues={currentDriverInput.address}
          onAnswer={(val) => {
            onSetCurrentDriverInput("address", val);
            if (val.hasLivedAtAddressFor60Days) {
              onNextStep();
            } else {
              onSetCurrentStep("22.A");
            }
          }}
        />
      ),
      ["22.A"]: (
        <PreviousCarAddressQuestion
          defaultValues={currentDriverInput.previousAddress}
          onAnswer={(val) => {
            onSetCurrentDriverInput("previousAddress", val);
            onSetCurrentStep(23);
          }}
        />
      ),
      [DRIVER_END_AT_STEP]:
        answerData.drivers.length === 4 ? (
          <FormLayout
            note="Add anyone who frequently drives your car or lives with you, like spouses or family members. FYI: Most insurers offer discounts for multi-driver policies."
            question="Would you like to add another driver?"
            answer={
              <div className="flex flex-col space-y-8">
                <div className="mx-auto text-foreground-900">
                  You have reached the maximum amount of drivers!
                </div>
                <Button
                  size="lg"
                  variant="outlined"
                  onClick={() => {
                    onNextStep();
                  }}
                >
                  CONTINUE
                </Button>
              </div>
            }
          />
        ) : (
          <FormLayout
            note="Add anyone who frequently drives your car or lives with you, like spouses or family members. FYI: Most insurers offer discounts for multi-driver policies."
            question="Would you like to add another driver?"
            answer={
              <div className="flex flex-col">
                <div className="flex flex-col space-y-8">
                  <Button
                    onClick={() => {
                      setIsFinished(true);
                    }}
                  >
                    NO, GET MY QUOTES
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onSetCurrentStep(DRIVER_START_AT_STEP);
                    }}
                  >
                    Yes, I want to insure another driver
                  </Button>
                </div>
                <div className="mt-8 lg:mt-10 text-lg text-primary-500 ">
                  By clicking &quot;Get quotes&quot;, you consent to insurance
                  carriers and other insurance professionals obtaining driving
                  related and credit-based insurance score reports where
                  allowable. These reports help improve the accuracy of quotes
                  and won&apos;t impact your credit score.
                </div>
              </div>
            }
          />
        ),
    }),
    [
      answerData.currentInsurer,
      answerData.drivers.length,
      answerData.userCars,
      answerData.zipCode,
      currentCarFullName,
      currentDriverInput.address,
      currentDriverInput.birthday,
      currentDriverInput.firstName,
      currentDriverInput.lastName,
      currentDriverInput.previousAddress,
      isNextDriver,
      onNextStep,
      onSetAnswerData,
      onSetCurrentCarInput,
      onSetCurrentDriverInput,
      onSetCurrentStep,
    ],
  );

  if (isSeeOfferList) {
    return <OfferList />;
  }

  if (isFinished) {
    return (
      <FeaturedCarrier
        onClickContinue={() => {
          setIsSeeOfferList(true);
        }}
      />
    );
  }

  return (
    <div className="margin-header flex-col">
      <div className="flex flex-col layout pt-[4.43rem] pb-7 lg:pt-[8rem] lg:pb-[0rem] lg:w-full lg:h-full lg:items-center lg:justify-center">
        <div className="flex flex-col w-full">
          {!!answeredStep.length && <BackButton onBack={handleGoBack} />}
          {map[currentStep]}
        </div>
      </div>
      <Stepper
        className="mt-[4rem] lg:mt-[6rem]"
        currentStepProgression={stepperProgression}
        currentStep={currentStepStepper}
        steps={["GETTING STARTED", "VEHICLES", "DRIVERS", "RESULTS"]}
      />
    </div>
  );
};

export default Inquiry;
