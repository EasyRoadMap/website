import { useState, useEffect } from "react";

const useAlert = (message, type) => {
    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                backgroundColor: "AliceBlue"
            }}
        >
            {message}
        </div>
    )
}

export default useAlert;