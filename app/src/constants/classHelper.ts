export enum ColorEnum {
  Background = "background",
  Primary = "primary",
  Secondary = "secondary",
  Accent = "accent"
}

const darkModeTransitionClasses = 'transition-colors duration-1000 delay-0'
const defaultTextClasses = `text-light-text dark:text-dark-text transition-[text-decoration-color] duration-1000`
const defaultBackgroundClasses = `bg-light-background dark:bg-dark-background transition-[background-color] duration-1000`
const backgroundClasses = (color: ColorEnum) => `bg-light-${color} bg-dark-${color} transition-[background-color] duration-1000`
const defaultBorderClasses = `border border-light-accent dark:border-dark-accent transition-[border-color] duration=1000`

export { darkModeTransitionClasses, defaultTextClasses, defaultBackgroundClasses, defaultBorderClasses, backgroundClasses }