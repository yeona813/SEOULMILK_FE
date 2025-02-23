interface NotiMessageProps {
  type: "noti" | "success" | "error";
  month?: number;
}

/**
 *
 * @param type - "noti" | "success" | "error"
 * @param month - (optional) noti인 경우 지급 결의서의 month
 * @returns
 */
const NotiMessage = ({ type, month }: NotiMessageProps) => {
  const notiType = {
    noti: {
      icon: "/assets/warning.svg",
      text: `${month}월 지급결의서 발행 요청이 도착했습니다.`,
      textColor: "text-warning-500",
      backgroundColor: "bg-warning-50",
    },
    success: {
      icon: "/assets/success.svg",
      text: "홈택스 검증결과, 발급된 사실이 있습니다.",
      textColor: "text-secondary-500",
      backgroundColor: "bg-secondary-25",
    },
    error: {
      icon: "/assets/error.svg",
      text: "홈택스 검증결과, 발급된 사실이 없습니다.",
      errorMessage:
        "데이터가 제대로 입력 되어있는지 확인 or 대리점에 문의하세요.",
      textColor: "text-primary-500",
      backgroundColor: "bg-primary-25",
    },
  };

  return (
    <div
      className={`w-[420px] px-2 py-[9px] flex gap-2 items-center rounded-lg ${notiType[type].backgroundColor}`}
    >
      <img src={notiType[type].icon} alt={type} />
      <div className="flex flex-col gap-1">
        <p className={`font-semibold text-b4 ${notiType[type].textColor}`}>
          {notiType[type].text}
        </p>
        {type === "error" && (
          <p className="font-medium text-c1 text-primary-300">
            {notiType[type].errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotiMessage;
