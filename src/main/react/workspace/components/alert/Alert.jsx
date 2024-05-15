import { useEffect } from "react";
import useErrorContext from "../../hooks/useErrorContext.js";

const Alert = ({
    ...props
}) => {
    const { errorContext } = useErrorContext();

    return (
        <>
        <div>
        {
            (errorContext && errorContext?.length > 0) && errorContext?.map((error, i) => {
                return (
                <div
                className="a123123"
                    style={{
                        position: "fixed",
                        top: (120 + (60*i)) + "px",
                        right: "120px",
                        width: "150px",
                        height: "50px",
                        backgroundColor: "AliceBlue"
                    }}
                >
                    {error.message.message}
                </div>
                )
            })
        }
        </div>
        {props.children}
        </>
    )
}

export default Alert;