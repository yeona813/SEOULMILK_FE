import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import "@/styles/SearchDatePicker.css";

interface CustomHeaderProps {
  date: Date;
  changeMonth: (month: number) => void;
}

const CustomHeader = ({ date, changeMonth }: CustomHeaderProps) => {
  const handlePrevMonth = () => {
    changeMonth(date.getMonth() - 1);
  };

  const handleNextMonth = () => {
    changeMonth(date.getMonth() + 1);
  };

  return (
    <div className="flex center bg-inherit">
      <div className="w-[212px] flex items-center gap-11">
        <button onClick={handlePrevMonth}>
          <div className="w-5 h-5 rounded-full center hover:bg-grayScale-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
            >
              <path
                d="M4.75 0.5L1.25 4L4.75 7.5"
                stroke="#525463"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        <span className="b2 text-grayScale-600">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
        <button onClick={handleNextMonth}>
          <div className="w-5 h-5 rounded-full center hover:bg-grayScale-50 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
            >
              <path
                d="M1.25 7.5L4.75 4L1.25 0.5"
                stroke="#525463"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

const SearchDatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [temporaryDate, setTemporaryDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMonthChange = (date: Date) => {
    setTemporaryDate(null);
    setCurrentMonth(date);
  };
  const handleClickOutside = () => {
    setTemporaryDate(null);
    setIsOpen(false);
  };

  const handleDateChange = (date: Date | null) => {
    setTemporaryDate(date);
  };

  const handleConfirm = () => {
    if (temporaryDate) {
      setStartDate(temporaryDate);
    }
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
    console.log(startDate);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center w-[200px] h-9 text-gray-600 border border-solid border-gray-200 rounded-md"
        onClick={handleInputClick}
      >
        <div className="w-full">
          {temporaryDate ? format(temporaryDate, "yyyy/MM/dd") : "YYYY/MM/DD"}
        </div>
        <div className="w-[36px] h-full center border-l border-solid border-gray-200">
          <img src="/assets/icons/calendar.svg" alt="캘린더" />
        </div>
      </button>
      {isOpen && (
        <div>
          <DatePicker
            selected={temporaryDate} // 임시 선택된 날짜
            onChange={handleDateChange} // 날짜 변경 시 임시 날짜 설정
            dateFormat="yyyy/MM/dd"
            placeholderText="YYYY/MM/DD"
            locale={ko}
            renderDayContents={(day, date) => {
              return date.getMonth() === currentMonth.getMonth() ? day : ""; // 현재 달에만 날짜 표시
            }}
            onMonthChange={handleMonthChange} // 달 변경 시 호출
            renderCustomHeader={(props) => <CustomHeader {...props} />} // "확인" 버튼을 추가한 헤더 렌더링
            shouldCloseOnSelect={false} // 날짜를 클릭해도 달력이 자동으로 닫히지 않도록 설정
            open={isOpen} // 달력이 열리거나 닫히는 상태를 제어
            onClickOutside={handleClickOutside} // 달력 외부 클릭 시 닫기
            showPopperArrow={false}
          >
            {/* "완료" 버튼을 선택된 날짜가 있을 때만 활성화 */}
            <button
              disabled={!temporaryDate} // 선택된 날짜가 없으면 비활성화
              onClick={handleConfirm}
              className="w-full h-8 bg-secondary-500 rounded-[4px] text-white b3 disabled:bg-secondary-50"
            >
              완료
            </button>
          </DatePicker>
        </div>
      )}
    </div>
  );
};

export default SearchDatePicker;
