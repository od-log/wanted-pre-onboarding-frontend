const useConfirm = (message = "", onConfirm) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    console.log(typeof onConfirm, "함수 아님");
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    }
  };
  return confirmAction;
};

export default useConfirm;
