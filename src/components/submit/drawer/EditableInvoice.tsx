import { useSubmitInvoiceStore } from "@/stores/useSubmitDrawerStore";
import { NtsTax } from "@/types/ntsTax";

const EditableInvoice = () => {
  const { selectedItem, updateInvoice } = useSubmitInvoiceStore(); // 스토어에서 데이터와 업데이트 함수 사용

  if (!selectedItem) {
    return <div className="my-4 text-center">데이터가 없습니다.</div>;
  }

  const handleInputChange = (field: keyof NtsTax, value: string) => {
    let formattedValue = value;

    // 승인번호 (12345678-12345678-12345678)
    if (field === "issueId") {
      formattedValue = formattedValue.replace(/\D/g, "").slice(0, 24);
      if (formattedValue.length > 8)
        formattedValue = formattedValue.replace(/^(\d{8})(\d)/, "$1-$2");
      if (formattedValue.length > 16)
        formattedValue = formattedValue.replace(
          /^(\d{8})-(\d{8})(\d{8})/,
          "$1-$2-$3"
        );
    }
    // 사업자등록번호 (123-12-12345)
    else if (field === "suId" || field === "ipId") {
      formattedValue = formattedValue.replace(/\D/g, "").slice(0, 10);
      if (formattedValue.length > 3)
        formattedValue = formattedValue.replace(/^(\d{3})(\d)/, "$1-$2");
      if (formattedValue.length > 6)
        formattedValue = formattedValue.replace(
          /^(\d{3})-(\d{2})(\d{1,5})/,
          "$1-$2-$3"
        );
    }
    // 날짜 (YYYY.MM.DD)
    else if (field === "issueDate" || field === "createdDate") {
      formattedValue = formattedValue.replace(/\D/g, "").slice(0, 8);
      if (formattedValue.length > 4)
        formattedValue = formattedValue.replace(/^(\d{4})(\d{2})/, "$1-$2");
      if (formattedValue.length > 6)
        formattedValue = formattedValue.replace(
          /^(\d{4})\.(\d{2})(\d{2})/,
          "$1-$2-$3"
        );
    }
    // 금액 필드 (숫자만 허용, 세 자리마다 콤마 추가)
    else if (["chargeTotal", "taxTotal", "grandTotal"].includes(field)) {
      formattedValue = formattedValue.replace(/\D/g, ""); // 숫자만 허용
      formattedValue = Number(formattedValue).toLocaleString(); // 세 자리마다 콤마 추가
    }

    updateInvoice(field, formattedValue);
  };

  const primaryData = {
    labels: [
      "승인번호",
      "전자세금계산서 작성일자",
      "공급자 사업등록번호",
      "공급 받는자 사업자등록번호",
      "공급가액",
    ],
    fields: [
      "issueId",
      "issueDate",
      "suId",
      "ipId",
      "chargeTotal",
    ] as (keyof NtsTax)[],
    values: [
      selectedItem.issueId,
      selectedItem.issueDate,
      selectedItem.suId,
      selectedItem.ipId,
      selectedItem.chargeTotal,
    ],
    placeholders: [
      "12345678-12345678-12345678",
      "2024.01.01",
      "123-12-12345",
      "123-12-12345",
      "9,999,999",
    ],
  };

  const secondaryData = {
    labels: ["총세액 합계", "합계금액", "매출매입구분", "생성일", "생성시간"],
    fields: [
      "taxTotal",
      "grandTotal",
      "ar",
      "createdDate",
      "createdTime",
    ] as (keyof NtsTax)[],
    values: [
      selectedItem.taxTotal,
      selectedItem.grandTotal,
      selectedItem.ar,
      selectedItem.createdAt,
      selectedItem.createdTime,
    ],
    placeholders: ["9,999,999", "9,999,999", "", "", ""],
  };

  return (
    <div>
      {/* Primary Data Section */}
      <div className="flex items-center justify-center mt-4">
        <div className="w-full bg-white border border-solid border-grayScale-200 h-[186px] rounded-lg flex">
          <div className="w-[174px]">
            <div className="ml-[18px] mr-[26px] my-[7px] b5 text-grayScale-600 flex flex-col gap-2">
              {primaryData.labels.map((label, index) => (
                <div key={index} className="w-[130px] h-7 flex items-center">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full border-l border-solid rounded-r-lg border-grayScale-200 bg-grayScale-25">
            <div className="ml-[18px] mr-[26px] my-[7px] b5 flex flex-col gap-2">
              {primaryData.fields.map((field, index) => (
                <input
                  key={index}
                  type="text"
                  value={primaryData.values[index]}
                  placeholder={primaryData.placeholders[index]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full px-[10px] border border-solid rounded h-7 bg-inherit border-grayScale-300 text-grayScale-900 focus:ring-1 focus:ring-secondary-500 focus:outline-none focus:caret-secondary-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Data Section */}
      <div className="mt-2 b5 text-secondary-500">
        *홈택스로 검증한 필수데이터입니다.
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="w-full bg-white border border-solid border-grayScale-200 h-[186px] rounded-lg flex">
          <div className="w-[174px]">
            <div className="ml-[18px] mr-[26px] my-[7px] b5 text-grayScale-600 flex flex-col gap-2">
              {secondaryData.labels.map((label, index) => (
                <div key={index} className="w-[130px] h-7 flex items-center">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full border-l border-solid rounded-r-lg border-grayScale-200 bg-grayScale-25">
            <div className="ml-[18px] mr-[26px] my-[7px] b5 flex flex-col gap-2">
              {secondaryData.fields.map((field, index) =>
                index >= 2 ? (
                  <div key={index} className="flex items-center w-full h-7">
                    {secondaryData.values[index]}
                  </div>
                ) : (
                  <input
                    key={index}
                    type="text"
                    value={secondaryData.values[index]}
                    placeholder={secondaryData.placeholders[index]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-[10px] border border-solid rounded h-7 bg-inherit border-grayScale-300 text-grayScale-900 focus:ring-1 focus:ring-secondary-500 focus:outline-none focus:caret-secondary-500"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 b5 text-secondary-500">
        *잠깐! 잘 옮겨졌는지 확인해주세요.
      </div>
    </div>
  );
};

export default EditableInvoice;
