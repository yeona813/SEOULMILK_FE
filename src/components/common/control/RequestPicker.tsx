import { useUserPickerStore } from "@/stores/useAdminStore";

enum PickType {
  EMPLOYEE = "사원",
  SHOP = "대리점",
}

const RequestPicker = () => {
  const { currentPick, setPick } = useUserPickerStore();

  const allOptions = Object.values(PickType);

  const currentIndex = allOptions.findIndex(
    (option) => option === PickType[currentPick]
  );

  const translateXValue = currentIndex * 100;
  return (
    <div className="relative flex h-fit rounded-lg w-fit p-[2px] bg-grayScale-100 overflow-hidden">
      <div
        className="absolute top-[2px] left-[2px] w-[100px] h-[28px] bg-white rounded-[7px] transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${translateXValue}px)`,
        }}
      />
      {Object.entries(PickType).map(([key, value]) => (
        <div
          key={key}
          className={`center relative w-[100px] h-[28px] b3 rounded-[7px]
            ${currentPick === key ? "text-grayScale-600" : "text-grayScale-500"} cursor-pointer`}
          onClick={() => setPick(key as "EMPLOYEE" | "SHOP")}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default RequestPicker;
