

type props = {
    label: string;
    value: string
}
const NonEditableProfileInput = ({label, value}: props)  => {
    return (
      <div>
        <div className="flex justify-between flex-col-reverse sm:gap-0 gap-2 sm:flex-row-reverse py-8 px-4 border-b-2 border-b-[#F1F1F1] text-[16px]">
          <p className="max-w-[18rem]">{value}</p>
          <p className="text-gray-500">{label}</p>
        </div>
      </div>
    );
}

export default NonEditableProfileInput