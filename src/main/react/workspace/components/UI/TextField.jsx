const TextField = ({
    data,
    setData,
    title,
    placeholder
}) => {
    return (
        <form>
            <label> {title} </label>
            <input type="text" placeholder={placeholder}/>
        </form>
    );
}

export default TextField;