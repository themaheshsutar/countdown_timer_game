import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ResultModalRef } from "../types/timer";

interface Props {
  result: string;
  targetTime: number;
}

const ResultModal = forwardRef<ResultModalRef, Props>(function ResultModal(
  { result, targetTime },
  ref
) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  return (
    <dialog className="result-modal" ref={dialog}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
