const classes = {
    main: 'button',
    box: 'button__box',
}

export const Button = ({
    title,
    className,
    inverted= false,
    children,
    ...rest
}) => {
  return (
    <div className={classes.main}>
        <button 
            className={` ${classes.box} ${className} ${inverted ? 'inverted': ''}`}
            {...rest}
        >
            {title}
        {children}
        </button>
    </div>
  )
}