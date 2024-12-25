import cn from '@lib/cn'
import type { TInsuranceItem } from '../_constants/types'
import Button from '@components/react/Button'

type InsuranceItem ={
insurance:TInsuranceItem
isFeatured?:boolean
}

const InsuranceItem = ({insurance,isFeatured}:InsuranceItem) => {
  return (
    <div className=' flex flex-col '>
      {isFeatured && <div className='bg-primary-900 rounded-t-md py-2 w-fit text-foreground-50 px-8 shadow-md'>⭐ Featured offer</div> } 
   <div
            className={cn("flex flex-col lg:flex-row bg-background-1  rounded-b-md shadow-lg  py-8 px-8 lg:w-full lg:space-x-10 lg:justify-evenly lg:items-center",
              !isFeatured && 'rounded-t-md'
            )}
          >
            <img
              className="w-[12rem] h-auto lg:h-auto mx-auto my-auto lg:mx-0 shrink-0 lg:w-[20%]"
              width={192}
              src={insurance.image}
              alt={insurance.name}
            />
            <ol className="text-sm flex max-w-lg flex-col space-y-2 my-5 md:my-7 lg:my-0 sm:mx-auto lg:w-[60%] ml-5 list-disc ">
              {insurance.texts?.map((text, idx) => (
                <li className="" key={idx}>
                  {text}
                </li>
              ))}
            </ol>
            <Button
              size="lg"
              className="max-w-lg mx-auto w-full lg:w-[20%] lg:shrink-0 lg:h-fit lg:my-auto"
            >
              View Rate
            </Button>
          </div>
          </div>
  )
}

export default InsuranceItem