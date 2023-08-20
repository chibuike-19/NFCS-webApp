'use client'

import Backdrop from "../UI/Backdrop";
import Card from "../UI/Card";
import { useAuth } from "../context/authService";

type Props = {
  mainText: string;
  onConfirm: (value: React.SetStateAction<boolean>) => void;
};

const Modal = ({onConfirm, mainText}: Props) => {
    const {setModal} = useAuth()

    return (
      <Backdrop>
        <Card className="p-5">
          <h1>{mainText}</h1>
          <div className="flex gap-4 justify-center mt-2">
            <button
              onClick={() => {
                onConfirm(true);
                setModal(false);
              }}
              className="border-2 border-blue-500 p-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setModal(false);
              }}
              className="border-2 border-blue-500 p-2"
            >
              No
            </button>
          </div>
        </Card>
      </Backdrop>
    );
}

export default Modal;