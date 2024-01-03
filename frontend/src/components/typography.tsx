import { tv } from 'tailwind-variants'

const typography = tv({
  base: 'font-sans',
  variants: {
    variant: {
      'headline-100': 'text-4xl font-bold',
      'headline-200': 'text-3xl font-bold',
      'headline-300': 'text-2xl font-bold',
      'headline-400': 'text-xl font-bold',
      'headline-500': 'text-lg font-bold',
      body: 'text-base',
      small: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

type Variant =
  | 'headline-100'
  | 'headline-200'
  | 'headline-300'
  | 'headline-400'
  | 'headline-500'
  | 'body'
  | 'small'

type Props = {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  className?: string
  variant?: Variant
}

export const Typography = ({
  as = 'p',
  className,
  variant = 'body',
  ...rest
}: Props) => {
  const Element = as

  return <Element className={typography({ variant: variant, className })} {...rest} />
}
