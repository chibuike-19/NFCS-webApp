

type ButtonProps = {
    value: string;
    extraClassnames?: string;
    onClick?: () => void
}
const Button = ({value, extraClassnames, onClick}: ButtonProps) => {

    return (
      <div>
        <button
          onClick={onClick}
          className={`${extraClassnames} text-white bg-[#007BA0]`}
        >
          {value}
        </button>
      </div>
    );
}

export default Button;