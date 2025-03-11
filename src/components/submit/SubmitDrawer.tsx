import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import NotiMessage from "../common/notification/NotiMessage";

interface SubmitDrawerProps {
  open: boolean;
  onClose: () => void;
  data: {
    number: number;
    supplier: string;
    retailer: string;
    date: string;
    amount: number;
    validationResult: boolean;
  } | null;
}

export default function SubmitDrawer({
  open,
  onClose,
  data,
}: SubmitDrawerProps) {
  const DrawerContent = () => {
    if (!data) return <div>No data available.</div>;

    const formattedNumber = data.number.toString().padStart(3, "0");

    return (
      <Box onClick={(event) => event.stopPropagation()}>
        <div className="flex-col pt-[146px] center">
          <div className="w-[421px]">
            <div>
              <div className="text-grayScale-400 b2">{formattedNumber}</div>
              <div className="h2">{data.supplier}</div>
              <div className="h2">{data.retailer}</div>
            </div>
            <div className="mt-10">
              <NotiMessage
                type="success"
                text="홈택스 검증결과, 발급된 사실이 있습니다. "
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <table className="w-full bg-white border border-solid rounded-lg border-grayScale-200 ">
                <tbody className="bg-white ">
                  <tr>
                    <td className="w-[130px] pr-[26px] pl-[18px] pt-[7px] pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      승인번호
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      20240680-41000005-78475918
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pr-[26px] pl-[18px]  pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      전자세금계산서 작성일자
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      2024.06.30
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pr-[26px] pl-[18px]  pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      공급자 사업등록번호
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      306-28-70320
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pl-[18px] pr-[26px] pb-[8px] h-[28px] text-left b5 text-grayScale-600  ">
                      공급 받는자 사업자등록번호
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      308-85-09085
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pl-[18px] pr-[26px] pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      합계금액
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      23,930,493
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2 b5 text-secondary-500">
              *홈택스로 검증한 필수데이터입니다.
            </div>

            <div className="flex items-center justify-center mt-10">
              <table className="w-full bg-white border border-solid rounded-lg border-grayScale-200 ">
                <tbody className="bg-white ">
                  <tr>
                    <td className="w-[130px] pr-[26px] pl-[18px] pt-[7px] pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      총세액 합계
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      23,179,824
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pr-[26px] pl-[18px]  pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      합계금액
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      26,323,542
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pr-[26px] pl-[18px]  pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      매출매입구분
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      AR
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pl-[18px] pr-[26px] pb-[8px] h-[28px] text-left b5 text-grayScale-600  ">
                      생성일
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      2025.02.22
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[130px] pl-[18px] pr-[26px] pb-[8px] h-[28px] text-left b5 text-grayScale-600  whitespace-nowrap">
                      생성시간
                    </td>
                    <td className="text-grayScale-500 b5 whitespace-nowrap bg-grayScale-25 pl-[17px]">
                      13:00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2 b5 text-secondary-500">
              *잠깐! 잘 옮겨졌는지 확인해주세요.
            </div>

            <div className="mt-[30px] text-secondary-500 b3 bg-secondary-25 border border-solid border-secondary-200 w-[143px] h-8 center gap-1 rounded-2xl">
              <img src="/assets/icons/picture.svg" alt="계산서 원본 보기" />
              계산서 원본 보기
            </div>
          </div>
        </div>
      </Box>
    );
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
          BackdropProps: {
            onClick: onClose, // Handle clicks on the backdrop
          },
        }}
      >
        <Box sx={{ width: 479 }} role="presentation">
          {DrawerContent()}
        </Box>
      </Drawer>
    </div>
  );
}
