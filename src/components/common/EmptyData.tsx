function EmptyData() {
  return (
    <div>
      <div className="flex-col center bg-grayScale-50 h-[450px]">
        <img src="/assets/icons/milk.svg" alt="milk" className="mb-[32px]" />
        <span className="mb-1 h1 text-grayScale-500">텅 비어있어요</span>
        <p className="s2 text-grayScale-500">계산서를 업로드해주세요.</p>
      </div>
    </div>
  );
}

export default EmptyData;
