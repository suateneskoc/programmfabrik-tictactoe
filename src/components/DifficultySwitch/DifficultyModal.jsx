import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { setDifficulty } from "../../features/gameSlice";
import {
  CircleFillIcon,
  CircleHalfIcon,
  CircleIcon,
  XLgIcon,
} from "../../assets/svgs";

const DifficultyRadioButton = ({
  children,
  difficulty,
  description,
  defaultChecked = false,
}) => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  return (
    <div className="my-2">
      <input
        className="peer sr-only"
        type="radio"
        value={difficulty}
        name="difficulty"
        id={`difficulty${difficulty}`}
        checked={game.difficulty === difficulty}
        // defaultChecked={defaultChecked}
        onClick={() => {
          console.log("here");
          dispatch(setDifficulty(difficulty));
        }}
      />
      <label
        htmlFor={`difficulty${difficulty}`}
        className="cursor-pointer bg-gray-50 peer-checked:bg-gray-200 text-gray-500 peer-checked:text-gray-900 rounded border border-gray-200 peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-gray-300 peer-checked:shadow-md
		dark:bg-gray-900 dark:peer-checked:bg-gray-800 dark:peer-checked:text-gray-100 dark:border-gray-800 dark:peer-checked:ring-gray-700 dark:peer-checked:shadow-white/10 block transition px-4 py-3"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{difficulty}</h3>
            <p className="text-sm font-light">{description}</p>
          </div>
          {children}
        </div>
      </label>
    </div>
  );
};

const DifficultyModal = ({ show, setShow }) => {
  const closeButtonRef = useRef(null);
  const difficulty = useSelector((state) => state.game.difficulty);
  const darkMode = useSelector((state) => state.darkMode.value);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className={`${darkMode ? "dark" : ""} fixed z-[98] inset-0`}
        initialFocus={closeButtonRef}
        onClose={setShow}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity backdrop-blur" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white dark:bg-black dark:text-gray-100 rounded-lg shadow-xl transform transition-all p-4 ">
              {/* Modal Header */}
              <div className="flex justify-between mb-5">
                <h2 className="text-xl font-semibold">Level of Difficulty</h2>
                <button
                  type="button"
                  className="cursor-pointer rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 p-2"
                  onClick={() => setShow(false)}
                  ref={closeButtonRef}
                >
                  <XLgIcon width={16} height={16} />
                </button>
              </div>
              {/* Modal Body */}
              <form className="flex flex-col">
                <DifficultyRadioButton
                  difficulty="Easy"
                  description="A broken clock is right twice a day"
                  defaultChecked={true}
                >
                  <CircleIcon
                    width={21}
                    height={21}
                    className={`${
                      difficulty === "Easy" ? "opacity-100" : "opacity-0"
                    } ml-3`}
                  />
                </DifficultyRadioButton>
                <DifficultyRadioButton
                  difficulty="Normal"
                  description="A good defender, not a good attacker"
                >
                  <CircleHalfIcon
                    width={21}
                    height={21}
                    className={`${
                      difficulty === "Normal" ? "opacity-100" : "opacity-0"
                    } ml-3`}
                  />
                </DifficultyRadioButton>
                <DifficultyRadioButton
                  difficulty="Hard"
                  description="Your best bet against an AI is a tie"
                >
                  <CircleFillIcon
                    width={21}
                    height={21}
                    className={`${
                      difficulty === "Hard" ? "opacity-100" : "opacity-0"
                    } ml-3`}
                  />
                </DifficultyRadioButton>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DifficultyModal;
