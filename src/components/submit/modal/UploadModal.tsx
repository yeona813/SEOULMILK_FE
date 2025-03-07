import Button from "@/components/common/button/Button";
import DeleteButton from "@/components/common/button/DeleteButton";
import ProgressBar from "@/components/common/control/ProgressBar";
import Modal from "@/components/common/modal/Modal";
import useModalStore from "@/stores/useModalStore";
import React, { useRef, useState } from "react";

const UploadModal = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openProcessing, closeUpload } = useModalStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleClickUploadArea = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal onClose={closeUpload}>
      <div className="flex-col gap-6 center w-[720px]">
        <ProgressBar currentNumber={1} />
        <span className="mt-2 h2 text-grayScale-900">계산서 업로드 하기</span>
        <div className="flex w-full gap-5">
          {/* 파일 업로드 영역 */}
          <div>
            <div
              className="w-[350px] h-[216px] center flex-col gap-4 rounded-lg border border-grayScale-100 bg-grayScale-25 cursor-pointer hover:bg-secondary-25 hover:border-secondary-300"
              onClick={handleClickUploadArea}
            >
              <img src="/assets/icons/file.svg" alt="file" />
              <div className="flex-col center">
                <span className="st3 text-grayScale-700">
                  파일을 선택하거나 올려주세요
                </span>
                <p className="b2 text-grayScale-500">OOMB 이하</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf, .jpg, .png"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* 파일 목록 */}
          <div className="flex flex-col w-full gap-1">
            <p className="flex justify-end w-full st3 text-grayScale-700">
              {files.length}건
            </p>

            <div className="flex w-full h-[183px] rounded-lg border border-grayScale-200 p-[6px] overflow-y-auto">
              {files.length > 0 && (
                <div className="flex flex-col w-full gap-1">
                  {files.map((file, index) => (
                    <div
                      className="flex px-2 py-[6px] w-full justify-between"
                      key={index}
                    >
                      <p className="b5 text-grayScale-700">{file.name}</p>
                      <DeleteButton
                        onClick={() => {
                          console.log(index);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <Button
            size="medium"
            color="green"
            disabled={files.length === 0}
            onClick={() => {
              closeUpload();
              openProcessing();
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
