
const classes = {
    main: 'input',
    title: 'input__title',
    box: 'input__box'
}
export const Input = ({
    className,
    title,
    type = 'text',
    msgError,
    ...rest
}) => {
    return (
        <div className={`${classes.main} ${className ? className : ''}`}>
            {title && <p className={classes.title}> {title} </p>}
            <input 
                className={classes.box}
                type={type}
                {...rest}
            />
        </div>
    )
}   

