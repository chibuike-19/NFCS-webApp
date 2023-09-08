

type props = {
    label: string;
    value: string
}
const NonEditableProfileInput = ({label, value}: props)  => {
    return (
      <div>
        <div className="flex justify-between flex-row-reverse py-8 px-4 border-b-2 border-b-[#F1F1F1] text-[16px]">
          <p>{value}</p>
          <p className="text-gray-500">{label}</p>
        </div>
      </div>
    );
}

export default NonEditableProfileInput