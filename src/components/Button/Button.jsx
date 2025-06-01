import "./Button.scss"
import classNames from "classnames"

import Icon from "@/components/Icon/"

const Button = (props) => {
  const {
    type = "button",
    href,
    label,
    isLabelVisible = false,
    iconName,
    iconPosition = "before", // 'before' | 'after'
    mode = "", // 'default' | 'transparent',
    className,
  } = props

  const isLink = href !== undefined
  const Component = isLink ? "a" : "button"

  const linkProps = { href }
  const buttonProps = { type }
  const specificProps = isLink ? linkProps : buttonProps

  const title = isLabelVisible ? label : undefined

  const IconComponent = iconName && (
    <Icon className="button__icon" name={iconName} />
  )
  return (
    <Component
      className={classNames(className, "button", {
        [`button--${mode}`]: mode,
      })}
      title={title}
      aria-label={title}
      {...specificProps}
    >
      {iconPosition === "before" && IconComponent}
      {!isLabelVisible && <span className="button__label">{label}</span>}
      {iconPosition === "after" && IconComponent}
    </Component>
  )
}

export default Button
