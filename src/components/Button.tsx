import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {};

export default function Button({ children, ...rest }: Props) {
  return <button {...rest}>{children}</button>;
}
