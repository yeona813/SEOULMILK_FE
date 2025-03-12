import { useState, useEffect } from "react";
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

interface SearchDatePickerProps {
  setDate: (date: Date | null) => void;
  selectedDate?: Date | null; // ✅ 기존 선택된 날짜 유지
}

const SearchDatePicker = ({ setDate, selectedDate }: SearchDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedDate || null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [temporaryDate, setTemporaryDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setStartDate(selectedDate || null); // ✅ 기존 선택된 날짜가 있으면 업데이트
  }, [selectedDate]);

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
      setDate(temporaryDate);
      setStartDate(temporaryDate); // ✅ 선택한 날짜를 상태에 반영
    }
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center w-[200px] h-9 text-gray-600 border border-solid border-gray-200 rounded-md"
        onClick={handleInputClick}
      >
        <div className="w-full">
          {startDate ? format(startDate, "yyyy/MM/dd") : "YYYY/MM/DD"}
        </div>
        <div className="w-[36px] h-full center border-l border-solid border-gray-200">
          <img src="/assets/icons/calendar.svg" alt="캘린더" />
        </div>
      </button>
      {isOpen && (
        <div>
          <DatePicker
            selected={temporaryDate || startDate} // ✅ 기존 선택된 날짜 유지
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText="YYYY/MM/DD"
            locale={ko}
            renderDayContents={(day, date) => {
              return date.getMonth() === currentMonth.getMonth() ? day : "";
            }}
            onMonthChange={handleMonthChange}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
            shouldCloseOnSelect={false}
            open={isOpen}
            onClickOutside={handleClickOutside}
            showPopperArrow={false}
          >
            <button
              disabled={!temporaryDate}
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
